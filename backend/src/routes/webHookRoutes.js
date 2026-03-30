import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    console.log('Webhook recebido:');
    console.log(req.body);

    res.json({ received: true });
});

export default router;