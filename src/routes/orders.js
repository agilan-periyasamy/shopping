import { route } from "./";
import OrdersDB from "../db/orders";
import HttpStatus from "http-status-codes";
import { ApplicationError } from "../lib/errors";
export const create = route(async (req, res) => {
    const { email, password } = req.body;
    const newUser = await OrdersDB.create(email, password);
    res.send({ data: newUser });
  }
);

export const getOrdersList = route(async (req, res) => {
  const ordersList = await OrdersDB.getOrdersList();
  console.log(ordersList);
  res.send({ message: "success", data: ordersList });
});

export const submitOrders = route(
  async (req, res) => {
    try {
      console.log(req.params);
      const userId  = req.params.userId,
            addressId = req.params.addressId;
      const orders  = req.body;
      const orderResult = await OrdersDB.submitOrders(userId,addressId,orders);
      res.send(orderResult);
    } catch (error) {
      throw new ApplicationError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
);
