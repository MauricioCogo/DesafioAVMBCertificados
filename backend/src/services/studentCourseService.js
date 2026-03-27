import StudentCourse from "../models/StudentCourse.js";

import Student from '../models/Student.js';
import Course from '../models/Course.js';

export const enrollStudentInCourseService = async (studentId, courseId) => {

    const student = await Student.findByPk(studentId);
    const course = await Course.findByPk(courseId);

    if (!student || !course) {
        throw new Error('NOT_FOUND');
    }

    await student.addCourse(course, {
        through: {
            status: 'PENDENTE'
        }
    });

    return { studentId, courseId };
};

export const getStudentCoursesService = async (studentId, institutionId) => {
    
    const student = await Student.findOne({
        where: { id: studentId, institution_id: institutionId },
        include: {
            association: 'courses',
            through: {
                attributes: ['status', 'hash', 'file_path']
            }
        }
    });

    if (!student) {
        throw new Error('NOT_FOUND');
    }

    return student;
};

export const updateStudentCourseService = async (id, data) => {

    const record = await StudentCourse.findByPk(id);

    if (!record) {
        throw new Error('NOT_FOUND')
    };

    await record.update(data);

    return record;
};

export const importStudentInCourseService = async (studentId, courseId, transaction) => {
    return await StudentCourse.create({
        student_id: studentId,
        course_id: courseId,
        status: 'EM_ANDAMENTO'
    }, { transaction });
};