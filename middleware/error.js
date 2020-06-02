const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (error, req, res, next) => {
  let err = { ...error };
  err.message = error.message;
  // Log to console
  console.log(error.stack);

  //Mongoose bad ObjectId
  if (error.name === 'CastError') {
    const message = `Resource not found with id of ${error.value}`;
    err = new ErrorResponse(message, 404);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};
module.exports = errorHandler;
