const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const config = require("./../config");
const User = require("./../models/user.schema");

/* A middleware function that is used to verify the token and if the token is valid then it will allow
the user to access the protected route. */
const varifyAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, config.JWT_SECRET);

      const user = await User.findById(decode._id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      req.status(401);
      throw new Error("Not Autorised to visit the link");
    }
  }
  req.status(401);
  throw new Error("Not Autorised to visit the link");
});

module.exports = { varifyAuth };
