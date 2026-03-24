import express from 'express';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { createInstitution, loginInstitution, getInstitutionAll } from './controllers/institutionController.js';

const router = express.Router();

router.post('/register', createInstitution);
router.post('/login', loginInstitution);
router.get('/all', authMiddleware, getInstitutionAll);

export default router;