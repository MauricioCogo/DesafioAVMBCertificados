import { translateAjvError } from '../utils/translateAjvError.js';
import { validateStudent } from '../validators/studentValidator.js';
import { findOrCreateCourse } from './courseService.js';
import { importStudentInCourseService } from './studentCourseService.js';
import { importStudentService } from './studentService.js';
import Database from '../database/index.js';

export const importStudentsService = async (data, institutionId) => {
    const created = [];
    const errors = [];

    const t = await Database.connection.transaction();

    if (!data || !Array.isArray(data)) {
        const error = new Error('Dados de importação inválidos');

        error.name = 'VALIDATION_ERROR';
        error.errors = [{
            campo: 'body', motivo: 'Deve ser um array de alunos'
        }];

        throw error;
    }


    for (let i = 0; i < data.length; i++) {
        const studentData = data[i];

        try {
            validateStudent(studentData);
        } catch (validationError) {

            validationError.details.forEach(err => {
                errors.push({
                    index: i + 1,
                    campo: err.instancePath || err.params.missingProperty,
                    motivo: translateAjvError(err)
                });
            });

            continue;
        }

        try {
            const student = await importStudentService(studentData, institutionId, t);

            const course = await findOrCreateCourse(studentData.curso, institutionId, t);

            await importStudentInCourseService(student.id, course.id, t);

            created.push({
                studentId: student.id,
                courseId: course.id
            });

            await t.commit();

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    if (errors.length > 0) {
        const error = new Error('Erros de validação encontrados');
        error.name = 'VALIDATION_ERROR';
        error.errors = errors;
        throw error;
    }

    return created;
};