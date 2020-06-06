import { route } from "./";
import usersDB from "../db/users";
import HttpStatus from "http-status-codes";
import { ApplicationError } from "../lib/errors";
/**
 * Route to create a user. Returns the new user in the payload
 */
export const create = route(
  async (req, res) => {
    try {
      const {
        name,
        email,
        mobile,
        password,
        role
      } = req.body;
      const newUser = await usersDB.create(
        name,
        email,
        mobile,
        password,
        role
      );
      res.send({ data: newUser });
    } catch (error) {
      throw error;
    }
  },
  {
    requiredFields: ["email", "password"]
  }
);

/**
 * Route to list out all users. Returns a list of all users in the payload.
 */
export const list = route(async (req, res) => {
  const users = await usersDB.list();
  console.log(users);
  res.send({ message: "success", data: users });
});

export const getUserById = route(async (req, res) => {
  const userId = req.params.id;
  // const userDb = new UserModel();
  const user = await usersDB.getUserById(userId);
  res.send({ data: user });
});