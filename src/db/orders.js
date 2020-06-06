/**
 * Stub implementation of database methods related to accessing
 * stored users.
 *
 * NOTE: this is a stub implementation meant to demonstrate how
 * the rest of the application can work.
 */
import BaseModel from "./base";
import OrdersSchema from "./schemas/orders.schema";
import ProductsSchema from "./schemas/products.schema";
import OrderItemSchema from "./schemas/orderItem.schema";
import AddressSchema from "./schemas/address.schema";
import HttpStatus from "http-status-codes";
import { ApplicationError } from "../lib/errors";
import {Op} from "sequelize";
export class OrdersDB extends BaseModel {
  constructor() {
    super();
    this.OrdersModel = this.connection.define("orders", OrdersSchema);
    this.ProductsModel = this.connection.define("products", ProductsSchema);
    this.OrderItemModel = this.connection.define("orderItems", OrderItemSchema);
    // this.OrderItemModel.belongsTo(this.ProductsModel);
    // this.ProductsModel.hasMany(this.OrderItemModel );
  }
  
  getOrdersList = async () => {
    try {
      const Orders = await this.OrdersModel.findAll({ 
        raw: true,
        attributes: [
          "orderId",
          "userId",
          "totalAmount",
          "status"],
        order: [["updatedAt", "desc"]] 
      });

      let ordersRecords = [];
      for (const ordersRecord of Orders) {
          const orderId = ordersRecord.orderId;
          const orderItems = await this.OrderItemModel.findAll({
            raw: true,
            attributes: ["productId", "quantity", "amount"],
            where: { orderId },
            order: [["updatedAt", "desc"]]
          });
          let productInfo = [];
          for (const ordersItem of orderItems) {
            const product = await this.ProductsModel.findOne({
              raw: true,
              attributes: ["productName"],
              where: { productId: ordersItem.productId },
              order: [["updatedAt", "desc"]]
            });
            const productName  = product.productName,
                  quantity = ordersItem.quantity,
                  amount = ordersItem.quantity;
            productInfo.push({
              ...ordersItem,
              productName,
              quantity
            });
          } 
          ordersRecords.push({
            ...ordersRecord,
            productInfo
          });
      }
      if (ordersRecords) return ordersRecords;
      else {
        throw new ApplicationError(
          "No Orders found!",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    } catch (error) {
      throw error;
    }
  };

  getOrdersByUserid = async (userId = null) => {
    try {
      if (!userId) {
        throw new ApplicationError("No userId provided", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const Orders = await this.OrdersModel.findAll({ 
        raw: true,
        attributes: [
          "orderId",
          "userId",
          "totalAmount",
          "status"],
        where: { userId: userId },
        order: [["updatedAt", "desc"]] 
      });
      let ordersRecords = [];
      for (const ordersRecord of Orders) {
          const orderId = ordersRecord.orderId;
          const orderItems = await this.OrderItemModel.findAll({
            raw: true,
            attributes: ["productId", "quantity", "amount"],
            where: { orderId },
            order: [["updatedAt", "desc"]]
          });
          let productInfo = [];
          for (const ordersItem of orderItems) {
            const product = await this.ProductsModel.findOne({
              raw: true,
              attributes: ["productName"],
              where: { productId: ordersItem.productId },
              order: [["updatedAt", "desc"]]
            });
            const productName  = product.productName,
                  quantity = ordersItem.quantity,
                  amount = ordersItem.quantity;
            productInfo.push({
              ...ordersItem,
              productName,
              quantity
            });
          } 
          ordersRecords.push({
            ...ordersRecord,
            productInfo
          });
      }
      if (ordersRecords) return ordersRecords;
      else {
        throw new ApplicationError(
          "No Orders found!",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    } catch (error) {
      throw error;
    }
  };

submitOrders = async (
    userId = null,
    addressId = null,
    orders
  ) => {
    try {
      if (
        userId === null ||
        addressId === null ||
        userId === "" ||
        addressId === "" ||
        typeof addressId == "undefined" ||
        typeof userId == "undefined" ||
        !typeof orders == "object" ||
        orders === null
      ) {
        throw new ApplicationError(
          "Invalid parameters passed",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      const createdOrder = await this.OrdersModel.create({userId, addressId});
      const orderId = createdOrder.orderId;
      let totalAmount = 0;
      // let isValid = true;
      for (const order of orders) {
        let updatedQty = 0;
        let amount = 0;
        const productId = order.productId;
        const quantity = order.quantity;
        const products = await this.ProductsModel.findOne({
            raw: true,
            attributes: ["productName", "price", "stock"],
            where: { 
              productId, 
              status:1,
              stock: {
                [Op.gt]: 0
              } 
            }
          });
          updatedQty = parseInt(products.stock - order.quantity);
          amount = parseInt(products.price * order.quantity);
          totalAmount += amount;
          const createdOrderItem = await this.OrderItemModel.create({orderId, productId, quantity, amount});
          if(!products || updatedQty <= 0) {
            // isValid = false; // order cancelled due to out of stock
            const updateOrder = await this.OrdersModel.update({status: 5}, 
              {
                where: {
                  orderId
                }
              });
            const updateOrderItem = await this.OrderItemModel.update({status: 5}, 
              {
                where: {
                  orderId
                }
              });
            throw new ApplicationError(
              "Out of Stock!",
              HttpStatus.INTERNAL_SERVER_ERROR
            );
          }
          const updateStock = await this.ProductsModel.update({stock: updatedQty}, 
            {
              where: {
                productId
              }
            });
      }
      const updateAmount = await this.OrdersModel.update({totalAmount: totalAmount}, 
        {
          where: {
            orderId
          }
        });
      if (updateAmount) {
        const response = {
          message: "Product(s) has been ordered successfully!"
        };
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

}

export default new OrdersDB(); // singleton instance of the database
