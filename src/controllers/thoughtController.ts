import { Request, Response } from 'express';
import { Thought } from '../models/index.js';

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const allThoughts = await Thought.find({});

        if (!allThoughts) {
            res.status(404).json({ message: 'No thoughts found' });
        }

        res.status(200).json(allThoughts);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createThought = async (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Will CREATE a thought' });
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

