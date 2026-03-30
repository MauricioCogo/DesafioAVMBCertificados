import axios from 'axios';

export const sendWebhook = async (url, payload) => {
    try {
        await axios.post(url, payload);
    } catch (error) {
        console.error('Erro no webhook:', error.message);
    }
};