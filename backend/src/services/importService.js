import { translateAjvError } from '../utils/translateAjvError.js';
import { validateStudent } from '../validators/studentValidator.js';
import { findOrCreateCourse } from './courseService.js';
import { importStudentInCourseService } from './studentCourseService.js';
import { importStudentService } from './studentService.js';
import { generateHash } from '../utils/hashGenerator.js';
import { generateXML } from '../utils/xmlGenerator.js';
import { sendWebhook } from '../utils/webHook.js';
import Database from '../database/index.js';

export const importStudentsService = async (data, institutionId) => {

    const created = [];
    const errors = [];

    const t = await Database.connection.transaction();

    try {

        if (!data || !Array.isArray(data)) {
            const error = new Error('Dados de importação inválidos');
            error.name = 'VALIDATION_ERROR';
            error.errors = [{
                campo: 'body',
                motivo: 'Deve ser um array de alunos'
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

            const student = await importStudentService(studentData, institutionId, t);
            const course = await findOrCreateCourse(studentData.curso, institutionId, t);

            const hash = generateHash(student, course);
            const xmlPath = generateXML(student, course, hash);

            await importStudentInCourseService(
                student.id,
                course.id,
                {
                    status: 'EM_ANDAMENTO',
                    hash,
                    file_path: xmlPath,
                    url_callback: studentData.url_callback
                },
                t
            );

            try {
                const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

                const url_consulta = `${baseUrl}/validate/certificate/${hash}`;

                const bodyWebHook = {
                    name: student.name,
                    cpf: student.cpf,
                    validation_code: hash,
                    course: course.name,
                    url_consulta,
                    hash
                };

                console.log(bodyWebHook);
                console.log(studentData.url_callback);
                
                await sendWebhook(studentData.url_callback, bodyWebHook);

                console.log("Webhook enviado com sucesso");

            } catch (err) {
                console.log('Webhook falhou:', err.message);
            }

            created.push({
                studentId: student.id,
                courseId: course.id,
                hash
            });
        }

        if (errors.length > 0) {
            const error = new Error('Erros de validação encontrados');
            error.name = 'VALIDATION_ERROR';
            error.errors = errors;
            throw error;
        }

        await t.commit();

        return created;

    } catch (error) {

        await t.rollback();

        throw error;
    }
};