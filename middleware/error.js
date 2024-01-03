function errorHandler(error, req, res, next) {
  // Handle Invalid ID error
  if (error.name === "CastError") {
    error.message = "Invalid ID";
    error.statusCode = 400;
  }

  // Handle Duplicate error
  if (error.code === 11000) {
    error.message = "Duplicate field value entered!";
    error.statusCode = 400;
  }

  if (error.name === "ValidationError") {
    error.statusCode = 400;
  }

  console.log(error)

  res
    .status(error.statusCode || 500)
    .json({ success: false, msg: error.message || "Server Error" });
}

module.exports = errorHandler;
