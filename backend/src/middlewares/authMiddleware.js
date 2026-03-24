import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token de autenticação ausente!' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Token de autenticação inválido!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.institution = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticação inválido!' });
    }
};

