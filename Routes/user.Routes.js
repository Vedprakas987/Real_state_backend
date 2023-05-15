const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/user.model");

userRouter.get("/", (req, res) => {
  res.send("Welcome to users");
});

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      isAdmin: isAdmin,
    });
    await user.save();
    res.send({ message: "User has been registered" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred while registering the user" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "ved");
    res.send({ message: "You are logged in", token });
  } catch (error) {
    res.status(500).send({ message: "An error occurred while logging in" });
  }
});

module.exports = {
  userRouter,
};
