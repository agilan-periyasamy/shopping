import { route } from ".";
import OrderItemDB from "../db/orderItem";
import HttpStatus from "http-status-codes";
/**
 * Route to create a user. Returns the new user in the payload
 */
export const create = route(
  async (req, res) => {
    const { email, password } = req.body;
    const newUser = await OrderItemDB.create(email, password);
    res.send({ data: newUser });
  }
);

/**
 * Route to list out all users. Returns a list of all users in the payload.
 */
export const list = route(async (req, res) => {
  const address = await OrderItemDB.list();
  console.log(address);
  res.send({ message: "success", data: address });
});
