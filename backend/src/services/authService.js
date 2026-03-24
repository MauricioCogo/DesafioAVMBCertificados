import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (institution) => {
    return jwt.sign(
        { id: institution.id, email: institution.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}