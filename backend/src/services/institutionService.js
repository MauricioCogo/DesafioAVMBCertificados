import Institution from '../models/Institution.js';
import { generateToken } from './authService.js';
import bcrypt from 'bcrypt';

export const createInstitutionService = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const institution = await Institution.create({
        name: data.name,
        email: data.email,
        password: hashedPassword
    });

    return institution;
};

export const loginInstitutionService = async (data) => {
    const institution = await Institution.findOne({
        where: { email: data.email }
    });

    if (!institution) {
        throw new Error('NOT_FOUND');
    }

    const passwordMatch = await bcrypt.compare(
        data.password,
        institution.password
    );

    if (!passwordMatch) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const token = generateToken(institution);

    return token;
};

export const getInstitutionAllService = async () => {
    const institutions = await Institution.findAll({
        where: { deleted: false },
        attributes: { exclude: ['password'] }
    });
    return institutions;
}
