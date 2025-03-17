import express from 'express';
import {
  createReadme,
  getAllReadMe
} from './controllers/readme.controllers.js';

const router = express.Router();

// Routes
router.post('/', createReadme);
router.get('/:type', getAllReadMe);

export default router;
