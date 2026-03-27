import { importStudentsService } from '../services/importService.js';

export const importStudents = async (req, res) => {
    try {
        const institutionId = req.institution.id;

        const result = await importStudentsService(req.body, institutionId);

        res.status(200).json({ message: 'Alunos importados com sucesso', students: result });
        
    } catch (error) {
        console.error('Erro ao importar alunos:', error);

        if (error.name === 'VALIDATION_ERROR'){
            return res.status(400).json({ message: 'Erro de validação', errors: error.errors });
        }

        res.status(500).json({ message: 'Erro ao importar alunos', error: error.message });
    }
};

