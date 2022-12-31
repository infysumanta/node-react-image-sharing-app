const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("./../models/user.schema");

/**
 * It checks if the user exists in the database, if not, it creates a new user.
 * username, email, and token. Otherwise, return an error message.
 * @param req - The request object.
 * @param res - The response object.
 */
const register = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !email || !username || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const emailExist = await User.exists({ email: email });
  if (emailExist) {
    res.status(400);
    throw new Error("Email already registered with us");
  }

  const usernameExist = await User.exists({ username: username });
  if (usernameExist) {
    res.status(400);
    throw new Error("Username already registered with us");
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: "User account created.",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        token: await user.getJWTToken(),
      },
    });
  }
  res.status(400);
  throw new Error("Something went wrong!");
});

/**
 * If the user exists and the password matches, return a success message with the user's name,
 * username, email, and token. Otherwise, return an error message.
 * @param req - The request object.
 * @param res - The response object.
 */
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const user = await User.findOne({ username: username });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      success: true,
      message: "User account created.",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        token: await user.getJWTToken(),
      },
    });
  }
  res.status(401);
  throw new Error("Invalid Email or Password");
});

module.exports = {
  login,
  register,
};
