import jwt from 'jsonwebtoken';
import { verifyAdminCredentials, getAdminById } from '../services/auth.service.js';
import AppError from '../utils/app-error.js';

const signToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'supersecretlocaldevelopmenttokenkey123!',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new AppError('Please provide both username and password', 400);
    }

    const admin = await verifyAdminCredentials(username, password);
    const token = signToken(admin.id);

    // Set secure cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        username: admin.username,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Clear cookies
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'strict',
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    // req.adminId comes from authentication middleware
    const admin = await getAdminById(req.adminId);
    
    res.status(200).json({
      success: true,
      data: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (err) {
    next(err);
  }
};
