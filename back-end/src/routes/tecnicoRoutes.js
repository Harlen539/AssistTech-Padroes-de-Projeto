import { Router } from 'express';
import tecnicoController from '../controllers/tecnicoController.js';

const router = Router();

router.get('/', tecnicoController.listar);
router.post('/', tecnicoController.criar);
router.put('/:id', tecnicoController.atualizar);
router.delete('/:id', tecnicoController.remover);

export default router;
