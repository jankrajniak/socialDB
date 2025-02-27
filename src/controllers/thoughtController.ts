import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const allThoughts = await Thought.find({});

        if (!allThoughts) {
            res.status(404).json({ message: 'No thoughts found' });
        } else {
            res.status(200).json(allThoughts);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username } = req.body;

    if (!thoughtText || !username) {
        res.status(400).json({ message: 'Thought text and username are required' });
    } else {
        try {
            const newThought = await Thought.create({ thoughtText, username });

            if (!newThought) {
                res.status(404).json({ message: 'Thought not created' });
            } else {
                const updatedUser = await User.updateOne(
                    { username },
                    { $addToSet: { thoughts: newThought._id } }
                )

                if (!updatedUser) {
                    await Thought.findByIdAndDelete(newThought._id);
                    res.status(404).json({ message: 'No user found with this username' });
                };
                res.status(200).json(newThought);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    };
};

export const getThoughtById = async (req: Request, res: Response) => {
    res.status(200).json({ message: `Will GET thought with ID ${req.params.thoughtId}` });
};

export const updateThought = async (req: Request, res: Response) => {
    res.status(200).json({ message: `Will UPDATE thought with ID ${req.params.thoughtId}` });
};

export const deleteThought = async (req: Request, res: Response) => { 
    res.status(200).json({ message: `Will DELETE thought with ID ${req.params.thoughtId}`})
};