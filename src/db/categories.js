/**
 * Stub implementation of database methods related to accessing
 * stored users.
 *
 * NOTE: this is a stub implementation meant to demonstrate how
 * the rest of the application can work.
 */
import BaseModel from "./base";
import CategoriesSchema from "./schemas/categories.schema";
import HttpStatus from "http-status-codes";
import { ApplicationError } from "../lib/errors";

export class CategoriesDB extends BaseModel {
  constructor() {
    super();
    this.CategoriesModel = this.connection.define("categories", CategoriesSchema);
  }
  
  list = async () => {
    try {
      const categories = await this.CategoriesModel.findAll({
        attributes: ["categoryId", "categoryName"],
        where: { status: 1 },
        order: [["createdAt", "DESC"]]
      });
      return categories;
    } catch (error) {
      throw error;
    }
  };
  
  create = async (categoryName) => {
    try {
      const newCategory = await this.CategoriesModel.bulkCreate(categoryName);
      return newCategory;
    } catch (e) {
      throw new ApplicationError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}

export default new CategoriesDB(); // singleton instance of the database
