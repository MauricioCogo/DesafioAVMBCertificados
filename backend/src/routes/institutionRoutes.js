import express from 'express';
import {
    createInstitution,
    loginInstitution,
    getInstitutionAll,
} from '../controllers/institutionController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', createInstitution);
router.post('/login', loginInstitution);
router.get('/', authMiddleware, getInstitutionAll);

export default router;