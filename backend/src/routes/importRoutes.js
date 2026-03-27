import express from 'express';
import { importStudents } from '../controllers/importController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, importStudents);

export default router;