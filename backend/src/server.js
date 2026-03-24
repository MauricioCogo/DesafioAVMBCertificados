import express from 'express';
import institutionRoutes from './routes.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use('/institutions', institutionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});