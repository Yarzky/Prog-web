const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  idade: { type: Number, min: 16, max: 100 },
  curso: { type: String, default: 'Programação Web' },
  notas: [Number],
  ativo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Aluno', alunoSchema);
