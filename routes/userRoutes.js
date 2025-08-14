const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController.js");
const protect = require("../middleware/authMiddleware.js");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/profile", protect, getProfile);

module.exports = userRouter;
