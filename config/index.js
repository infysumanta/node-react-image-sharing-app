/* Exporting the variables to be used in other files. */
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI:
    process.env.MONGO_URI || "mongodb://localhost/node-react-book-store-app",
  JWT_SECRET: process.env.JWT_SECRET || "thisisjwtsecret",
  NODE_ENV: process.env.NODE_ENV || "development",
};
