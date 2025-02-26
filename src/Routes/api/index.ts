import { Router } from 'express';
import { thoughtRouter } from './thoughtRoutes.js';
import { userRouter } from './userRoutes.js';

const router = Router();

// /api/thoughts
router.use('/thoughts', thoughtRouter);

// /api/users
router.use('/users', userRouter);

export default router;