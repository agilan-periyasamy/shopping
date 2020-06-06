import { route } from "./";
import CategoriesDB from "../db/categories";
import HttpStatus from "http-status-codes";

export const create = route(
  async (req, res) => {
    const categoryName  = req.body;
    const newCategory = await CategoriesDB.create(categoryName);
    res.send({ data: newCategory });
  }
);

export const list = route(async (req, res) => {
  const address = await CategoriesDB.list();
  console.log(address);
  res.send({ message: "success", data: address });
});
