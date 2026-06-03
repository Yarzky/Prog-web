const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.post('/', alunoController.create);
router.get('/', alunoController.getAll);
router.get('/:id', alunoController.getById);
router.put('/:id', alunoController.update);
router.delete('/:id', alunoController.delete);

module.exports = router;
