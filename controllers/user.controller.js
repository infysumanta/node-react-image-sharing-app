const asyncHandler = require("express-async-handler");

/**
 * It takes in a request and a response, and returns a response with the user's details.
 * @param req - The request object.
 * @param res - The response object.
 */
const getUserDetails = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User Validated",
    user: user,
  });
});

module.exports = {
  getUserDetails,
};
