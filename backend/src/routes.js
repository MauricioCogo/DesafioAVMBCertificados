import express from 'express';
import { createInstitution, loginInstitution } from './controllers/institutionController.js';

const router = express.Router();

router.post('/register', createInstitution);
router.post('/login', loginInstitution);

export default router;