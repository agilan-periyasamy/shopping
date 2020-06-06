/**
 * Stub implementation of database methods related to accessing
 * stored users.
 *
 * NOTE: this is a stub implementation meant to demonstrate how
 * the rest of the application can work.
 */
import BaseModel from "./base";
import OrderItemSchema from "./schemas/orderItem.schema";
import HttpStatus from "http-status-codes";
import { ApplicationError } from "../lib/errors";

export class OrderItemDB extends BaseModel {
  constructor() {
    super();
    this.OrderItemModel = this.connection.define("orderItems", OrderItemSchema);
  }
  /**
   * Finds a user based on an id/password pair. If user doesn't exist
   * or password doesn't match, this function returns null.
   * @param {string} id user's id
   * @param {string} password user's password
   */
  
  list = async () => {
    try {
      const categories = await this.OrderItemModel.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  };
  /**
   * Creates a new user and stores it in the database.
   * @param {string} userName the new user's userName
   * @param {string} password the new user's password
   */
  create = async (email, password) => {
    const newUserId = uuid.v4();
    const newUser = {
      id: newUserId,
      email,
      password
    };
    try {
      const createdUser = await this.OrderItemModel.create(newUser);
      return createdUser;
    } catch (e) {
      throw new ApplicationError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}

export default new OrderItemDB(); // singleton instance of the database
