/**
 * Stub implementation of database methods related to accessing
 * stored users.
 *
 * NOTE: this is a stub implementation meant to demonstrate how
 * the rest of the application can work.
 */
import { hashPassword, comparePassword } from "../lib/crypto";
import BaseModel from "./base";
import UserSchema from "./schemas/user.schema";
import uuid from "uuid";
import HttpStatus from "http-status-codes";
import { ApplicationError } from "../lib/errors";
import { decodeToken, generateToken } from "../lib/token";
const PUBLIC_FIELDS = [
  "userId",
  "name",
  "email",
  "mobile",
  "role"
];

const filterFields = (toFilter, allowedFields) => {
  return allowedFields.reduce((memo, field) => {
    return { ...memo, [field]: toFilter[field] };
  }, {});
};

export class UsersDB extends BaseModel {
  constructor() {
    super();
    this.model = this.connection.define("user", UserSchema);
  }
  /**
   * Finds a user based on an id/password pair. If user doesn't exist
   * or password doesn't match, this function returns null.
   * @param {string} id user's id
   * @param {string} password user's password
   */
  // list = async () => {
  //   return this.users.map(user => filterFields(user, PUBLIC_FIELDS));
  // };
  
  list = async (filterPrivateFields = true) => {
    try {
      const user = await this.model.findAll({
        attributes: ["userId", "name", "email", "mobile", "role"],
        where: { status: 1 },
        order: [["createdAt", "DESC"]]
      });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  getUserByCredentials = async (email, password) => {
    try {
      const user = await this.model.findOne({
        raw: true,
        where: {
          email
        }
      });
      if (!user) {
        throw new ApplicationError(
          "User not found",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      if (await comparePassword(password, user.password)) {
        const userData = filterFields(user, PUBLIC_FIELDS);
        return userData;
      }
    } catch (e) {
      throw new ApplicationError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  };

  /**
   * Finds a user based on its id. If user doesn't exist, this
   * function returns null.
   * @param {string} id user's id
   * @param {boolean} filterPrivateFields filter out private
   * fields. defaults to true
   */
  getUserById = async (userId, filterPrivateFields = true) => {
    try {
      const foundUser = await this.model.findOne({
        raw: true,
        where: {
          userId
        }
      });
      if (filterPrivateFields) {
        return filterFields(foundUser, PUBLIC_FIELDS);
      }
      return foundUser;
    } catch (e) {
      throw new ApplicationError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  /**
   * Creates a new user and stores it in the database.
   * @param {string} userName the new user's userName
   * @param {string} password the new user's password
   */
  // create = async (email, password) => {
  //   const newUserId = uuid.v4();
  //   const newUser = {
  //     id: newUserId,
  //     email,
  //     password: await hashPassword(password)
  //   };
  //   try {
  //     const createdUser = await this.model.create(newUser);
  //     return filterFields(createdUser, PUBLIC_FIELDS);
  //   } catch (e) {
  //     throw new ApplicationError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // };
  create = async (
    name,
    email,
    mobile,
    password,
    role
  ) => {
    try {
      // TODO make this work with onboarding survey + current exercise program association.
      // first check to see if there is already an existing user with this email
      const foundUser = await this.model.findAll({
        where: {
          email
        }
      });
      console.log(foundUser);
      if (foundUser.length === 0) {
        const hashedPassword = await hashPassword(password);
        const createdUser = await this.model.create({
          name,
          email,
          mobile,
          password: hashedPassword,
          role
        });
        const token = await generateToken(createdUser.userId);

        return {
          user: {
            userId: createdUser.userId,
            email: createdUser.email,
            name: createdUser.name,
            role: createdUser.role
          },
          token,
          message: "success"
        };
      } else {
        throw new ApplicationError(
          "That email address / Mobile is already registered.",
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            email, mobile
          }
        );
      }
    } catch (error) {
      throw error;
    }
  };
}

export default new UsersDB(); // singleton instance of the database
