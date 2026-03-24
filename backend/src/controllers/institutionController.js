export const createInstitution = (req, res) => {

    res.status(201).json({ message: 'Instituição criada com sucesso!' });
}

export const loginInstitution = (req, res) => {
    res.status(200).json({ message: 'Login realizado com sucesso!' });
} 