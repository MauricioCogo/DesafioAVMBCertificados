import express from 'express';
import {
    createInstitution,
    loginInstitution,
    getInstitutionAll,
    infoInstitution,
} from '../controllers/institutionController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', createInstitution);
router.post('/login', loginInstitution);
router.get('/me', authMiddleware, infoInstitution);
router.get('/', authMiddleware, getInstitutionAll);

export default router;