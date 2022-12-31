const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Schema = mongoose.Schema;

/* Creating a schema for the user. */
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profilePic: {
    type: String,
  },
});

/* This is a middleware that is used to hash the password before saving it to the database. */

userSchema.pre("save", async function (next) {
  /* This is a middleware that is used to hash the password before saving it to the database. */
  if (!this.isModified) {
    next();
  }

  /* Generating a salt for the password. */
  const salt = await bcrypt.genSalt(10);
  /* Hashing the password before saving it to the database. */
  this.password = await bcrypt.hash(this.password, salt);
});

/* A method that is used to compare the password that the user enters with the password that is stored in the database. */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = async function () {
  return jwt.sign({ _id: this._id }, config.JWT_SECRET, { expiresIn: "30d" });
};

/* Creating a model for the userSchema. */
const User = mongoose.model("User", userSchema);

module.exports = User;
