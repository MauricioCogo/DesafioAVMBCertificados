import express from 'express';

import institutionRoutes from './institutionRoutes.js';
import studentRoutes from './studentRoutes.js';
import courseRoutes from './courseRoutes.js';
import studentCourseRoutes from './studentCourseRoutes.js';

const router = express.Router();

router.use('/institutions', institutionRoutes);
router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);
router.use('/student-courses', studentCourseRoutes);

export default router;