import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => Promise.reject(error));


export const login = async (data) => {
    try {
        const res = await api.post('/institutions/login', data);
        console.log('Login response:', res.data);
        return res.data;
    } catch (err) {
        console.error('Login error:', err.response?.data || err.message);
        throw err;
    }
};

export const register = async (data) => {
    try {
        console.log(data);

        const res = await api.post('/institutions/register', data);
        console.log('Register response:', res.data);
        return res.data;
    } catch (err) {
        console.error('Register error:', err.response?.data || err.message);
        throw err;
    }
};

export const getStudents = async () => {
    try {
        const res = await api.get('/student-courses/student/');
        console.log('Get students response:', res.data);

        return res;
    } catch (err) {
        console.error('Get students error:', err.response?.data || err.message);
        throw err;
    }
};

export const importStudents = async (data) => {
    try {
        const res = await api.post('/import', data);
        console.log('Import students response:', res.data);
        return res.data;
    } catch (err) {
        console.error('Import students error:', err.response?.data || err.message);
        throw err;
    }
};

export const cancelStudent = async (id) => {
    try {
        const res = await api.delete(`/students/${id}`);
        console.log(`Cancel student ${id} response:`, res.data);
        return res.data;
    } catch (err) {
        console.error(`Cancel student ${id} error:`, err.response?.data || err.message);
        throw err;
    }
};

export const validateCertificate = async (hash) => {
    try {
        const res = await api.get(`/validate/certificate/${hash}`);
        console.log(`Validate certificate ${hash} response:`, res.data);
        return res;
    } catch (err) {
        console.error(`Validate certificate ${hash} error:`, err.response?.data || err.message);
        throw err;
    }
};

export const downloadCertificate = (hash) =>
    `http://localhost:3000/validate/download/${hash}`;

export default api;