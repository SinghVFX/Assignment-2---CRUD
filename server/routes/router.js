// Import required modules
const express = require("express");
const route = express.Router();

// Import CUSTOM modules
const services = require("../services/render");
const controller = require("../controller/controller");
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/middleware");

// Define route handlers for different HTTP paths (DIFFERENT URLS)
route.get("/", services.homeRoutes); // Render the home page
route.get("/add-post", services.add_post); // Render the add post page
route.get("/update-post", services.update_post); // Render the update post page
route.get("/register-user", services.register_user); // Render the register user page
route.get("/signin-user", services.signInUser); // Render the sign in user page

// Define route handlers for the API endpoints
route.post("/api/posts", authMiddleware.authenticateToken, controller.create);
route.get("/api/posts", controller.find);
route.put(
  "/api/posts/:id",
  authMiddleware.authenticateToken,
  controller.update
);
route.delete(
  "/api/posts/:id",
  authMiddleware.authenticateToken,
  controller.delete
);

// Define route handlers for the user routes
route.post("/api/register-user", userController.registerUser); // Create a new user
route.post("/api/signin-user", userController.signInUser); // Sign in a user

// Export the router object so it can be used by other modules
module.exports = route;
