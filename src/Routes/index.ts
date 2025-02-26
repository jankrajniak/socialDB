import { Router } from 'express';
import apiRoutes from './api/index.js';
const router = Router();

// /api/
router.use('/api', apiRoutes);

export default router;