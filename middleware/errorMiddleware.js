const config = require("./../config");

/**
 * It creates a new error object with a message that includes the requested URL, sets the status code
 * to 404, and then passes the error object to the next error handler.
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * If the status code is 200, then set the status code to 500, otherwise, set the status code to the
 * current status code. Then, send a JSON response with the error message and the stack trace.
 * @param err - The error object
 * @param req - The request object.
 * @param res - The response object
 * @param next - This is a function that is called when the middleware is complete.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: config.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
