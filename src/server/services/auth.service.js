import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import AppError from '../utils/app-error.js';

export const verifyAdminCredentials = async (username, password) => {
  // Query username in database
  const result = await db.query(
    'SELECT id, username, password_hash FROM admins WHERE username = $1',
    [username]
  );

  if (result.rows.length === 0) {
    throw new AppError('Invalid username or password', 401);
  }

  const admin = result.rows[0];

  // Compare passwords
  const isMatch = await bcrypt.compare(password, admin.password_hash);
  if (!isMatch) {
    throw new AppError('Invalid username or password', 401);
  }

  return {
    id: admin.id,
    username: admin.username,
  };
};

export const getAdminById = async (id) => {
  const result = await db.query(
    'SELECT id, username FROM admins WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Admin session not found', 404);
  }

  return result.rows[0];
};
