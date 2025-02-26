import { Router } from 'express';
import reactionRoutes from './reactions/index.js';
const router = Router( { mergeParams: true } );

import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} from '../../controllers/thoughtController.js';

// api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// api/thoughts/:thoughtId
router.use('/:thoughtId', reactionRoutes);

export { router as thoughtRouter };
