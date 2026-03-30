import express from 'express';
import 'dotenv/config';
import cors from "cors";

import './database/index.js';

import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});