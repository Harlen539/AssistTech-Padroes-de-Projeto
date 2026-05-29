import { Router } from 'express';
import chamadoRoutes from './chamadoRoutes.js';
import tecnicoRoutes from './tecnicoRoutes.js';
import usuarioRoutes from './usuarioRoutes.js';
import assistenteRoutes from './assistenteRoutes.js';

const router = Router();

router.get('/health', (request, response) => {
  response.json({ status: 'ok', service: 'assisttech-api' });
});

router.use('/chamados', chamadoRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/tecnicos', tecnicoRoutes);
router.use('/assistente', assistenteRoutes);

export default router;
