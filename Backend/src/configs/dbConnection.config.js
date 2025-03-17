import mongoose from 'mongoose';
import { MONGODB_URI } from './environment.config.js';
import logger from '../utils/logger.util.js';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    logger.log('Database Connected successfully!');
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
