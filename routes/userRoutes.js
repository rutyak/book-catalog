const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController.js");
const protect = require("../middleware/authMiddleware.js");

const userRouter = express.Router();

userRouter.post("/api/users/register", registerUser);

userRouter.post("/api/users/login", loginUser);

module.exports = userRouter;
