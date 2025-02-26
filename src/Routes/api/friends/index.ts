import { Router } from 'express';
import { friendRouter } from './friendRoutes.js';

const router = Router( { mergeParams: true } );

// api/users/:userId/friends
router.use('/friends', friendRouter);

export default router;

