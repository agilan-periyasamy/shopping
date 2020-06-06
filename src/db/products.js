/**
 * Stub implementation of database methods related to accessing
 * stored users.
 *
 * NOTE: this is a stub implementation meant to demonstrate how
 * the rest of the application can work.
 */
import BaseModel from "./base";
import ProductsSchema from "./schemas/products.schema";
import HttpStatus from "http-status-codes";
import { ApplicationError } from "../lib/errors";
import {Op} from "sequelize";
export class ProductsDB extends BaseModel {
  constructor() {
    super();
    this.ProductsModel = this.connection.define("products", ProductsSchema);
  }
  
  list = async () => {
    try {
      const products = await this.ProductsModel.findAll({
        attributes: ["productId", "categoryId", "productName", "description", "price", "stock"],
        where: { status: 1 },
        order: [["createdAt", "DESC"]]
      });
      return products;
    } catch (error) {
      throw error;
    }
  };

  getProductByCid = async (categoryId) => {
    try {
      const foundUser = await this.ProductsModel.findAll({
        attributes: ["productId", "categoryId", "productName", "description", "price", "stock"],
        raw: true,
        where: {
          categoryId,
          status: 1
        },
        order: [["createdAt", "DESC"]]
      });
      return foundUser;
    } catch (e) {
      throw new ApplicationError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  create = async (product) => {
    try {
      const createdProduct = await this.ProductsModel.create(product);
      return createdProduct;
    } catch (e) {
      throw e;
    }
  };
  updateProductStock = async (productId, productObject) => {
    try {
      const updateStock = await this.ProductsModel.update(productObject, {
        where: {
          productId
        }
      });
      if (updateStock) {
        const response = {
          message: "Stock Count has been updated successfully!"
        };
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  getAvailableProductStock = async () => {
    try {
      const productList = await this.ProductsModel.findAll({
        raw: true,
        attributes: ["productName", "description", "stock"],
        where: { 
          status: 1,
          stock: {
            [Op.gt]: 0
          }
        },
        order: [["createdAt", "DESC"]]
      });
      return productList;
    } catch (e) {
      throw new ApplicationError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}

export default new ProductsDB(); // singleton instance of the database
