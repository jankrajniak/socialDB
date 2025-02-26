import { Router } from 'express';
import { reactionRouter } from './reactionRoutes.js';

const router = Router( { mergeParams: true } );

// /api/throughts/:thoughtId/reactions
router.use('/reactions', reactionRouter);

export default router;