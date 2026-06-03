require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/alunos', alunoRoutes);

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aula29';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    }
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

module.exports = app;
