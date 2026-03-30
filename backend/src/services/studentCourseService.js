import StudentCourse from "../models/StudentCourse.js";

import Student from '../models/Student.js';
import fs from 'fs';

export const enrollStudentInCourseService = async (studentId, courseId) => {

    const exists = await StudentCourse.findOne({ where: { student_id: studentId, course_id: courseId } });

    if (exists) {
        throw new Error('DUPLICATE');
    }

    return await StudentCourse.create({
        student_id: studentId,
        course_id: courseId,
        status: 'EM_ANDAMENTO'
    }, { transaction });
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

export const getAllStudentCoursesService = async (institutionId) => {
    const students = await Student.findAll({
        where: { institution_id: institutionId, deleted: false },
        include: {
            association: 'courses',
            through: {
                attributes: ['status', 'hash', 'file_path', 'url_callback']
            }
        }
    });

    return students.map(student => student.toJSON());
};

export const updateStudentCourseService = async (id, data) => {

    const record = await StudentCourse.findByPk(id);

    if (!record) {
        throw new Error('NOT_FOUND')
    };

    await record.update(data);

    return record;
};

export const updateStudentCourseStatusService = async (id, data) => {

    const record = await StudentCourse.findByPk(id);

    if (!record) {
        throw new Error('NOT_FOUND')
    };

    await record.update(data);

    return record;
};

export const importStudentInCourseService = async (studentId, courseId, data, transaction) => {
    return await StudentCourse.create({
        student_id: studentId,
        course_id: courseId,
        status: data.status || 'EM_ANDAMENTO',
        hash: data.hash,
        file_path: data.file_path,
        url_callback: data.url_callback,
    }, { transaction });
};

export const downloadCertificateService = async (hash) => {

    console.log('HASH RECEBIDO:', hash);

    const record = await StudentCourse.findOne({
        where: { hash: hash.trim() },
        paranoid: false
    });

    console.log(record);



    if (!record) {
        throw new Error('NOT_FOUND');
    }

    const filePath = record.file_path;

    console.log(filePath);
    console.log("ISODFGJÇLDSFJIGIOJSDFG");

    if (!filePath || !fs.existsSync(filePath)) {
        throw new Error('FILE_NOT_FOUND');
    }
    return record.file_path;
}
