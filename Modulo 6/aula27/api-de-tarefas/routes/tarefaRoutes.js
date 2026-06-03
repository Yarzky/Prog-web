import express from 'express';
const router = express.Router();
import * as ctrl from '../controllers/tarefaController.js';

router.get('/', ctrl.listar);
router.post('/', ctrl.criar);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.remover);

export default router;
