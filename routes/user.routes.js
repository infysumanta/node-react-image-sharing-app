const express = require("express");
const { getUserDetails } = require("../controllers/user.controller");
const { varifyAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(varifyAuth, getUserDetails);

module.exports = router;
