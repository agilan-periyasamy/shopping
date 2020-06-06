import { route } from "./";
import ProductsDB from "../db/products";
import HttpStatus from "http-status-codes";
import { ApplicationError } from "../lib/errors";

export const create = route(
  async (req, res) => {
    try{
      const product = req.body;
      console.log(req.body);
      const newProduct = await ProductsDB.create(product);
      res.send({ data: newProduct });
    } catch (error) {
      console.log(error);
      throw new ApplicationError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
);

export const list = route(async (req, res) => {
  const address = await ProductsDB.list();
  console.log(address);
  res.send({ message: "success", data: address });
});

export const getProductByCid = route(async (req, res) => {
  const categoryId = req.params.categoryid;
  const product = await ProductsDB.getProductByCid(categoryId);
  res.send({ data: product });
});

export const updateProductStock = route(async (req, res) => {
  try {
    const productId = req.params.productId;
    const productObject = req.body;
    const updateProductStock = await ProductsDB.updateProductStock(productId, productObject);
    res.send({ data: updateProductStock });
  } catch (error) {
    throw new ApplicationError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

export const getAvailProductStock = route(async (req, res) => {
  try {
    const availProduct = await ProductsDB.getAvailableProductStock();
    res.send({ data: availProduct });
  } catch (error) {
    throw new ApplicationError(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
});