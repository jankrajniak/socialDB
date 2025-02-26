import { Router } from 'express';
import { friendRouter } from './friendRoutes.js';

const router = Router( { mergeParams: true } );

router.use('/friends', friendRouter);

export default router;

