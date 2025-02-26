import { Router } from 'express';
const router = Router({ mergeParams: true });

import {
    addReaction,
    deleteReaction,
} from '../../../controllers/reactionController.js';

// /api/thoughts/:thoughtId/reactions
router.route('/')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:reactionId')
    .delete(deleteReaction);

export { router as reactionRouter };