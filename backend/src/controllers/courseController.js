import { createCourseService, getAllCoursesService,getCourseByIdService,updateCourseService } from '../services/courseService.js'; 

export const createCourse = async (req, res) => {

    try {
        const course = await createCourseService(req.body, req.institution.id);
        
        return res.status(201).json({
            message: 'Curso criado com sucesso!',
            course
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar curso', details: error.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await getAllCoursesService(req.institution.id);
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar cursos', details: error.message });
    }
}

export const getCourseById = async (req, res) => {
    try {
        const course = await getCourseByIdService(req.params.id, req.institution.id);
        return res.status(200).json(course);
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Curso não encontrado!' });
        }
        return res.status(500).json({ error: 'Erro ao buscar curso', details: error.message });
    }
}

export const updateCourse = async (req, res) => {
    try {
        const course = await updateCourseService(req.params.id, req.body, req.institution.id);
        return res.status(200).json({
            message: 'Curso atualizado com sucesso!',
            course
        });
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Curso não encontrado!' });
        }
        return res.status(500).json({ error: 'Erro ao atualizar curso', details: error.message });
    }
}

export const deleteCourse = async (req, res) => {
    try {
        await deleteCourseService(req.params.id, req.institution.id);
        return res.status(200).json({ message: 'Curso deletado com sucesso!' });
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Curso não encontrado!' });
        }
        return res.status(500).json({ error: 'Erro ao deletar curso', details: error.message });
    }
}

