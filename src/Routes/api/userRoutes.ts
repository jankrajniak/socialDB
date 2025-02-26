import { Router } from 'express';
import friendRoutes from './friends/index.js';
const router = Router();

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../../controllers/userController.js';

// /api/users/
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId
router.use('/:userId', friendRoutes);

export { router as userRouter };