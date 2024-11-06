import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export const auth = async (req, res, next) => {
  console.log("Auth middleware executed"); // Agrega este log

  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Not authorized' })

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(401).json({ message: 'Not authorized, invalid token' })

      req.user = user;
      next();
    });

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}