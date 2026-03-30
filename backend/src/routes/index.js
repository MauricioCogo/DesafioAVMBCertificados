import express from 'express';

import institutionRoutes from './institutionRoutes.js';
import studentRoutes from './studentRoutes.js';
import courseRoutes from './courseRoutes.js';
import studentCourseRoutes from './studentCourseRoutes.js';
import importRoutes from './importRoutes.js';
import validationRoutes from './validationRoutes.js';
import webHookRoutes from './webHookRoutes.js';

const router = express.Router();

router.use('/institutions', institutionRoutes);
router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);
router.use('/student-courses', studentCourseRoutes);
router.use('/import', importRoutes);
router.use('/validate', validationRoutes);
router.use('/webhook', webHookRoutes);

export default router;