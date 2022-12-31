require("dotenv").config();
require("./config/db").connectDB();

const app = require("./app");
const config = require("./config");

app.listen(config.PORT, () => {
  console.log("Connected to port " + config.PORT);
});
