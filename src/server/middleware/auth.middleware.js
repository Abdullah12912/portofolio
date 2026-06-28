import jwt from 'jsonwebtoken';
import AppError from '../utils/app-error.js';

const authMiddleware = (req, res, next) => {
  // Extract token from HttpOnly cookie
  const token = req.cookies?.token;

  if (!token) {
    return next(new AppError('Unauthorized: No authentication token provided', 401));
  }

  try {
    // Verify signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretlocaldevelopmenttokenkey123!');
    
    // Save admin identifier in request context
    req.adminId = decoded.id;
    next();
  } catch (err) {
    return next(new AppError('Unauthorized: Authentication token is invalid or expired', 401));
  }
};

export default authMiddleware;
