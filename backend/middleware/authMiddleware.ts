import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let completeToken = req.headers.authorization;
    let token;
    const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;
    if (completeToken && completeToken.startsWith('Bearer')) {
      try {
        token = completeToken.split(' ')[1];
        const decoded: any = jwt.verify(token, JWT_SECRET);
        let userFound = await User.findById(decoded.id).select('-password');
        if (userFound !== null) {
          req.user = userFound;
        }
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  },
);
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('No authorized as an admin');
  }
});

export { protect, admin };
