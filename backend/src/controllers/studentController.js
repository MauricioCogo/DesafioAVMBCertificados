import {createStudentService, getAllStudentsService, getStudentByIdService, updateStudentService, deleteStudentService} from '../services/studentService.js';

export const createStudent = async (req, res) => {
    try {
        const student = await createStudentService(req.body, req.institution.id);
        return res.status(201).json({
            message: 'Aluno criado com sucesso!',
            student
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao criar aluno', details: error.message });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await getAllStudentsService(req.institution.id);
        return res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar alunos', details: error.message });
    }
}

export const getStudentById = async (req, res) => {
    try {
        const student = await getStudentByIdService(req.params.id, req.institution.id);
        return res.status(200).json(student);
    }
    catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Aluno não encontrado!' });
        }
        return res.status(500).json({ error: 'Erro ao buscar aluno', details: error.message });
    }
}

export const updateStudent = async (req, res) => {
    try {
        const student = await updateStudentService(req.params.id, req.body, req.institution.id);
        return res.status(200).json({
            message: 'Aluno atualizado com sucesso!',
            student
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar aluno', details: error.message });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        await deleteStudentService(req.params.id, req.institution.id);
        return res.status(200).json({ message: 'Aluno deletado com sucesso!' });
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Aluno não encontrado!' });
        }
        return res.status(500).json({ error: 'Erro ao deletar aluno', details: error.message });
    }
}
