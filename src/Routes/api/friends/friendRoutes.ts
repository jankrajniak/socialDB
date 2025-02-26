import { Router } from 'express';
const router = Router( { mergeParams: true } );

import {
    addFriend,
    deleteFriend,
} from '../../../controllers/friendController.js';

// /api/users/:userId/friends/
router.route('/')
    .post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:friendId')
    .delete(deleteFriend);

export { router as friendRouter };


