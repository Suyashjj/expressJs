import express from 'express';
import { showReport } from '../controllers/studentController.js';

const router = express.Router();

router.get('/', showReport); // This serves the home page

export default router;
