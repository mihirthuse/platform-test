//express is used to include express.js features
const express = require('express');

//router object is responsible to route requests to the specified method
const router = express.Router();

const UserController = require('../controllers/usercontroller');

//This query routes to the controller to retrieve list of all the registered users.
router.get("/", UserController.list_all_users);

//This query routes to the controller for new user registration.
router.post("/signup", UserController.user_signup);

//This query routes to the controller for user login.
router.post("/login", UserController.user_login);

//This query routes to the controller for user information update.
router.patch("/", UserController.user_update);

//This query routes to the controller to delete a user.
router.delete("/", UserController.user_delete);

//This query routes to the controller to log out a user by invalidating it's token value;
router.post("/logout", UserController.user_logout);

module.exports = router;