import jwt from 'jsonwebtoken';

const authOptionalMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretlocaldevelopmenttokenkey123!');
      req.adminId = decoded.id;
    } catch (err) {
      // Ignore token verification errors on optional routes
    }
  }

  next();
};

export default authOptionalMiddleware;
