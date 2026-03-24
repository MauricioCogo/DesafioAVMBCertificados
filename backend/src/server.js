import express from 'express';
import institutionRoutes from './routes.js';
import Institution from './models/Institution.js';
import Sequelize from 'sequelize';
import config from './config/database.cjs';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());


const sequelize = new Sequelize(config.development);
Institution.init(sequelize);

app.use('/institutions', institutionRoutes);

sequelize.authenticate().then(() => {

  console.log('Conexão com o banco de dados estabelecida com sucesso.')
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

}

).catch((error) => {
  console.error('Erro ao conectar com o banco de dados:', error);
});
