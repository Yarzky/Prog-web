import express from 'express';
import logger from './middleware/logger.js';
import tarefaRoutes from './routes/tarefaRoutes.js';

const app = express();
const PORT = 3000;

// Middleware de log customizado
app.use(logger);

// Middleware built-in para parsear JSON
app.use(express.json());

// Servir arquivos estáticos (opcional, conforme requisito 6)
app.use(express.static('public'));

// Rotas
app.use('/tarefas', tarefaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
