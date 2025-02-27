import { Response, Request } from 'express';
import { Thought } from '../models/index.js';

export const addReaction = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    const { reactionBody } = req.body;

    if (!thoughtId || !reactionBody) {
        res.status(400).json({ message: 'Thought ID and reaction body are required' });
    } else {
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push: { reactions: { reactionBody}}},
            { new: true},
        )

        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this ID' });
        } else {
            res.status(200).json(updatedThought);
        }
    }
};

export const deleteReaction = async (req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params;

    if (!thoughtId || !reactionId) {
        res.status(400).json({ message: 'Thought ID and reaction ID are required' });
    } else {
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { reactionId }}},
            { new: true},
        )

        if (!updatedThought) {
            res.status(404).json({ message: 'Thought or reaction not found' });
        } else {
            res.status(200).json(updatedThought);
        }
    }
};