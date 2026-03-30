import crypto from 'crypto';

export const generateHash = (student, course) => {
    const data = `${student.cpf}-${course.codigo}-${Date.now()}`;

    return crypto
        .createHash('sha256')
        .update(data)
        .digest('hex');
};