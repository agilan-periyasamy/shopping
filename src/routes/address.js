import { route } from "./";
import AddressDB from "../db/address";
import { ApplicationError } from "../lib/errors";
import HttpStatus from "http-status-codes";

export const create = route(
  async (req, res) => {
    try {
      const userId = req.params.userid;
      const {
        fullName,
        address1,
        address2,
        city,
        state,
        postalCode,
        phone,
        locationType
      } = req.body;
      const createdAddress = await AddressDB.create({
        userId,
        fullName,
        address1,
        address2,
        city,
        state,
        postalCode,
        phone,
        locationType
      });
      res.send({ message: "success", data: createdAddress });
    } catch (error) {
      throw new ApplicationError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
);

export const list = route(async (req, res) => {
  const address = await AddressDB.list();
  res.send({ message: "success", data: address });
});

export const getAddressByUserId = route(async (req, res) => {
  const userId = req.params.userid;
  const user = await AddressDB.getAddressByUserId(userId);
  res.send({ data: user });
});