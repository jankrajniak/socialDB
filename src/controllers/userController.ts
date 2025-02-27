import { Request, Response } from 'express';
import { User } from '../models/index.js';

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;

    if (!username || !email) {
        res.status(400).json({ message: 'Missing required fields' });
    } else {
        try {
            const newUser = await User.create({ username, email });
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    
};

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('thoughts').populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user found with this ID' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { username, email } = req.body;

    if (!username && !email) {
        res.status(400).json({ message: 'Missing required fields' });
    } else {
        try {
            const updateFields: any = {};
            username ? updateFields.username = username : null;
            email ? updateFields.email = email : null;
    
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: updateFields },
                { new: true }
            )
    
            if (!updatedUser) {
                res.status(404).json({ message: 'No user found with this ID' });
            };
    
            res.status(200).json(updatedUser);
    
        } catch (error) {
            res.status(500).json(error);
        };
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        await User.findByIdAndDelete(userId);
        //TODO - Delete all thoughts associated with User!
        res.status(200).json({message: `User with ID ${userId} has been deleted`});
    } catch (error) {
        res.status(500).json(error);
    }
};