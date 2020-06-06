/**
 * Stub implementation of database methods related to accessing
 * stored users.
 *
 * NOTE: this is a stub implementation meant to demonstrate how
 * the rest of the application can work.
 */
import BaseModel from "./base";
import AddressSchema from "./schemas/address.schema";
import HttpStatus from "http-status-codes";
import { ApplicationError } from "../lib/errors";

export class AddressDB extends BaseModel {
  constructor() {
    super();
    this.AddressModel = this.connection.define("address", AddressSchema);
  }
  
  list = async () => {
    try {
      const address = await this.AddressModel.findAll();
      return address;
    } catch (error) {
      throw error;
    }
  };

  getAddressByUserId = async (userId) => {
    try {
      const foundUser = await this.AddressModel.findAll({
        raw: true,
        where: {
          userId
        }
      });
      return foundUser;
    } catch (e) {
      throw new ApplicationError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  create = async (
      userId,
      fullName,
      address1,
      address2,
      city,
      state,
      postalCode,
      phone,
      locationType
    ) => {
    try {
      const createdAddress = await this.AddressModel.create(
        userId,
        fullName,
        address1,
        address2,
        city,
        state,
        postalCode,
        phone,
        locationType);
      return createdAddress;
    } catch (e) {
      throw new ApplicationError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}

export default new AddressDB(); // singleton instance of the database
