import express from 'express';
import {
    linkStudentCourse,
    updateStudentCourse,
    getStudentCourses
} from '../controllers/studentCourseController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, linkStudentCourse);

router.get('/student/:studentId', authMiddleware, getStudentCourses);

router.put('/:id', authMiddleware, updateStudentCourse);

export default router;