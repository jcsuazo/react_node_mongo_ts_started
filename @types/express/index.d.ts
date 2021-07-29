import * as express from 'express';
import { UserDocument } from '../../backend/models/userModel';
declare global {
  namespace Express {
    interface Request {
      user: UserDocument;
    }
  }
}
