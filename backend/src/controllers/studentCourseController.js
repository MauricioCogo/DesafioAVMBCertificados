import { enrollStudentInCourseService, getStudentCoursesService, updateStudentCourseService } from '../services/studentCourseService.js';

export const linkStudentCourse = async (req, res) => {
    try {
        const { student_id, course_id } = req.body;
        const enrollment = await enrollStudentInCourseService(student_id, course_id);
        return res.status(201).json({
            message: 'Aluno vinculado ao curso com sucesso!',
            enrollment
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao vincular aluno ao curso', details: error.message });
    }
};

export const getStudentCourses = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const institutionId = req.institution.id;
        const student = await getStudentCoursesService(studentId, institutionId);
        return res.status(200).json(student);
    }
    catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Aluno não encontrado!' });
        }
        return res.status(500).json({ error: 'Erro ao buscar cursos do aluno', details: error.message });
    }
};

export const updateStudentCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedRecord = await updateStudentCourseService(id, data);
        return res.status(200).json({
            message: 'Vínculo atualizado com sucesso!',
            updatedRecord
        });
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Vínculo não encontrado!' });
        }
        return res.status(500).json({ error: 'Erro ao atualizar vínculo', details: error.message });
    }
};
