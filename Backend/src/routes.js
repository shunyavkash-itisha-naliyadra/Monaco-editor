import express from 'express';
const routes = express.Router();
import readMeRoutes from './lib/routes.js';
routes.use('/readme', readMeRoutes);
export default routes;
