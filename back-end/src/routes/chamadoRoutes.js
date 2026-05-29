import { Router } from 'express';
import chamadoController from '../controllers/chamadoController.js';

const router = Router();

router.get('/', chamadoController.listar);
router.get('/:id', chamadoController.buscarPorId);
router.post('/', chamadoController.criar);
router.put('/:id/status', chamadoController.avancarStatus);

export default router;
