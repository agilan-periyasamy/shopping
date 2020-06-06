// Defines an express app that runs the boilerplate codebase.

import bodyParser from "body-parser";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { ApplicationError } from "./lib/errors";
import {
  create as createAddressRoute,
  list as listAddressRoute,
  getAddressByUserId
} from "./routes/address";
import {
  create as createUserRoute,
  list as listUsersRoute,
  getUserById
} from "./routes/users";
import {
  create as createCategory,
  list as listCategory
} from "./routes/categories";
import {
  create as createProducts,
  list as listProducts,
  getProductByCid,
  updateProductStock,
  getAvailProductStock
} from "./routes/products";
import {
  getOrdersByUserid,
  getOrdersList,
  submitOrders
} from "./routes/orders";
import {
  create as createOrderItem,
  list as listOrderItem
} from "./routes/orderItem";
import {
  authenticate as authenticateRoute,
  verify as verifyUserMiddleware,
  verifyAdmin as verifyAdminMiddleware,
} from "./routes/sessions";

export default function createRouter() {
  // *********
  // * SETUP *
  // *********

  const router = express.Router();

  // static assets, served from "/public" on the web
  router.use("/public", express.static(path.join(__dirname, "..", "public")));

  router.use(cookieParser()); // parse cookies automatically
  router.use(bodyParser.json()); // parse json bodies automatically

  /**
   * Uncached routes:
   * All routes that shouldn't be cached (i.e. non-static assets)
   * should have these headers to prevent 304 Unmodified cache
   * returns. This middleware applies it to all subsequently
   * defined routes.
   */
  router.get("/*", (req, res, next) => {
    res.set({
      "Last-Modified": new Date().toUTCString(),
      Expires: -1,
      "Cache-Control": "must-revalidate, private"
    });
    next();
  });

  // *****************
  // * API ENDPOINTS *
  // *****************

  /*
   * sessions endpoints
   */
  // Login / authenticate. Returns a json web token to use with requests.
  router.post("/api/sessions", authenticateRoute);

  /*
   * users endpoints
   */
  // the sessions.verify middleware ensures the user is logged in
  router.get("/api/users", verifyUserMiddleware, listUsersRoute);
  router.post("/api/users", createUserRoute);
  router.get("/api/user/:id", verifyUserMiddleware, getUserById);

  /*
   * address endpoints
   */
  router.get("/api/address", verifyUserMiddleware, listAddressRoute);
  router.post("/api/address/:userid", verifyUserMiddleware, createAddressRoute);
  router.get("/api/getaddress/:userid", verifyUserMiddleware, getAddressByUserId);

  /*
   * category endpoints
   */
  router.get("/api/category", listCategory);
  router.post("/api/category", verifyAdminMiddleware, createCategory);
  
  /*
   * Products endpoints
   */
  router.get("/api/products", listProducts);
  router.post("/api/product", verifyAdminMiddleware,createProducts);
  router.get("/api/getProductsByCid/:categoryid", getProductByCid);
  router.put("/api/updateStock/:productId", verifyAdminMiddleware, updateProductStock);
  router.get("/api/getAvailStock", getAvailProductStock);
  /*
   * Orders endpoints
   */
  router.get("/api/getOrdersList", verifyAdminMiddleware, getOrdersList);
  router.get("/api/getOrdersList/:userId", getOrdersByUserid);
  router.post("/api/:userId/:addressId/submitOrders", verifyUserMiddleware, submitOrders);

  // ******************
  // * ERROR HANDLING *
  // ******************

  // 404 route
  router.all("/*", (req, res, next) => {
    next(new ApplicationError("Not Found", 404));
  });

  // catch all ApplicationErrors, then output proper error responses.
  //
  // NOTE: express relies on the fact the next line has 4 args in
  // the function signature to trigger it on errors. So, don't
  // remove the unused arguments!
  router.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).send({
        message: err.message,
        data: err.data || {}
      });
      return;
    }

    // If we get here, the error could not be handled.
    // Log it for debugging purposes later.
    console.error(err);

    res.status(500).send({
      message: "Uncaught error"
    }); // uncaught exception
  });

  // *******************
  // * CATCH ALL ROUTE *
  // *******************

  /**
   * If you want all other routes to render something like a one-page
   * frontend app, you can do so here; else, feel free to delete
   * the following comment.
   */
  /*
   * function renderFrontendApp(req, res, next) {
   *   // TODO: add code to render something here
   * }
   * // all other pages route to the frontend application.
   * router.get('/*', renderFrontendApp);
   */

  return router;
}
