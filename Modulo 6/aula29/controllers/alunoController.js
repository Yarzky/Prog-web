const Aluno = require('../models/Aluno');

// CREATE
exports.create = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ (ALL + Filter)
exports.getAll = async (req, res) => {
  try {
    const { curso } = req.query;
    const filter = curso ? { curso: new RegExp(curso, 'i') } : {};
    const alunos = await Aluno.find(filter);
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ (ONE)
exports.getById = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.status(200).json(aluno);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.status(200).json({ message: 'Aluno removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
