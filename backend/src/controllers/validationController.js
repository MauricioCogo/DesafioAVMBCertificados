import StudentCourse from "../models/StudentCourse.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";

export const validateCertificate = async (req, res) => {
    const { hash } = req.params;
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    const record = await StudentCourse.findOne({
        where: { hash },
        paranoid: false,
        include: [
            { model: Student, as: 'student', attributes: ['name', 'cpf'] },
            { model: Course, as: 'course', attributes: ['name', 'id', 'start_date', 'end_date'] }
        ]
    });

    console.log(record);


    if (!record) {
        return res.status(404).json({ error: 'Certificado não encontrado' });
    }

    if (record.deleted || record.status === 'CANCELADO') {
        throw new Error('INVALID');
    }


    return res.json({
        aluno: record.student.name,
        cpf: record.student.cpf,
        curso: record.course.name,
        status: record.status,
        download_url: `${baseUrl}/validate/download/${hash}`
    });
}