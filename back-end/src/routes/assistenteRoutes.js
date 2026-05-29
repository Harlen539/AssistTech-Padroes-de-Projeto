import { Router } from 'express';
import assistenteController from '../controllers/assistenteController.js';

const router = Router();

router.post('/perguntar', assistenteController.perguntar);

export default router;
