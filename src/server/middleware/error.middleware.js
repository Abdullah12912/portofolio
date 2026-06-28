// Centralized error handling middleware
const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Format standard error response
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  // Log error stack for unexpected system exceptions
  if (err.statusCode === 500 || !err.isOperational) {
    console.error('💥 ERROR Stack:', err);
  }

  res.status(err.statusCode).json(response);
};

export default errorMiddleware;
