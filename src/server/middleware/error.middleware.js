import { deleteUploadFile } from '../utils/file-cleanup.js';

// Centralized error handling middleware
const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Enforce CTO Decision #026: Centralized upload cleanup on error
  try {
    // 1. Handle single file upload
    if (req.file) {
      deleteUploadFile(req.file.path);
    }

    // 2. Handle multiple file uploads
    if (req.files) {
      if (Array.isArray(req.files)) {
        req.files.forEach(file => deleteUploadFile(file.path));
      } else if (typeof req.files === 'object') {
        Object.values(req.files).forEach(fileGroup => {
          if (Array.isArray(fileGroup)) {
            fileGroup.forEach(file => deleteUploadFile(file.path));
          }
        });
      }
    }
  } catch (cleanupErr) {
    console.error('💥 Failed to perform error-driven file cleanup:', cleanupErr.message);
  }

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
