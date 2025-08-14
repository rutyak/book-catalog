const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.cookie("token", token);

      return res.json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }

    res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
