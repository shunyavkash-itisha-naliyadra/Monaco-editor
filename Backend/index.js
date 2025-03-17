import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PORT } from './src/configs/environment.config.js';
import connectDB from './src/configs/dbConnection.config.js';
import userRoutes from './src/routes.js';
import requestLogger from './src/middlewares/requestLogger.middleware.js';

import logger from './src/utils/logger.util.js';
const app = express();
const port = PORT || 4004;

// Middleware
app.use(requestLogger());
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/v1', userRoutes);
// Start Server
app.listen(port, async () => {
  await connectDB();
  logger.log(`Server running on http://localhost:${port}`);
});
