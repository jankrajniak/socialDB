import { Response, Request } from 'express';
import { User } from '../models/index.js';

export const addFriend = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { friendId } = req.body;

    if (userId === friendId) {
        res.status(400).json({ message: 'You cannot add yourself as a friend' });
    } else if (!userId || !friendId) {
        res.status(400).json({ message: 'Missing required fields' });
    };

    try {
        const newFriend = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true }
        );

        if (!newFriend) {
            res.status(404).json({ message: 'No user found with this ID' });
        };

        const updatedUser = await User.findById(userId).populate('friends');

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;

    if (!userId || !friendId) {
        res.status(400).json({ message: 'Missing required fields' });
    };

    try {
        const removedFriend = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true },
        )

        if (!removedFriend) {
            res.status(404).json({ message: 'No user found with this ID' });
        };

        const updatedUser = await User.findById(userId).populate('friends');
        
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    };   
};