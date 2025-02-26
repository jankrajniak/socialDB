import { Request, Response } from 'express';

export const getAllThoughts = async (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Will GET all thoughts' });
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

