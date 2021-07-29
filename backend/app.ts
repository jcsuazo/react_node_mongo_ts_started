import dotenv from 'dotenv';
import createServer from './server';
dotenv.config();
const startServer = () => {
  const app = createServer();
  const port: number = parseInt(<string>process.env.PORT);
  const PORT = process.env.PORT || 5000;
  const ENV = process.env.NODE_ENV;
  app.listen(PORT, () => {
    console.log(`Server running in ${ENV} mode on port ${PORT}`);
    // console.log(`Server running in ${ENV} mode on port ${PORT}`.yellow.bold);
  });
};
startServer();
