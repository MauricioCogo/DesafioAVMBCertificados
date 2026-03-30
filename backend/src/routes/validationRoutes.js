import express from 'express';
import { validateCertificate } from '../controllers/validationController.js';
import { downloadCertificate } from '../controllers/studentCourseController.js';

const router = express.Router();

router.get('/download/:hash', downloadCertificate);
router.get('/certificate/:hash', validateCertificate);

export default router;