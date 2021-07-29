import path from 'path';
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config();

connectDB();
export default function createServer() {
  const app: Application = express();
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  //
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Api is running...');
  });
  // ROTES
  //User rotes
  app.use('/api/users', userRoutes);
  //Upload Image rotes
  app.use('/api/upload', uploadRoutes);

  //GET PAYPAL
  app.use('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID),
  );

  //Statics Folders
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

  app.use(notFound);

  app.use(errorHandler);
  return app;
}
