const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

/* Creating an instance of the express application. */
const app = express();

app.use(express.json());
app.use(cors());
app.use(logger("common"));

/* This is a route handler. It is a function that is called when a request is made to the specified route. */
app.get("/", (_, res) => {
  res.send("Server working 🔥");
});

/* Using the routes. */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use(notFound);
app.use(errorHandler);

module.exports = app;
