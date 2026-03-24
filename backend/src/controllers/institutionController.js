import {
    createInstitutionService,
    loginInstitutionService,
    getInstitutionAllService
} from '../services/institutionService.js';

export const createInstitution = async (req, res) => {

    try {
        await createInstitutionService(req.body);

        return res.status(201).json({
            message: 'Instituição criada com sucesso!'
        });

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar instituição', details: error.message });
    }
};

export const loginInstitution = async (req, res) => {
    try {
        const token = await loginInstitutionService(req.body);
        return res.status(200).json({ token });
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Instituição não encontrada!' });
        }

        if (error.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }

        return res.status(500).json({ error: 'Erro no login', details: error.message });
    }
};

export const getInstitutionAll = async (req, res) => {
    try {
        const institutions = await getInstitutionAllService();
        return res.status(200).json(institutions);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar instituições', details: error.message });
    }

}