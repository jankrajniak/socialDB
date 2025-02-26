import { Response, Request } from 'express';

export const addReaction = async (req: Request, res: Response) => {
    res.status(200).json({ message: `Will ADD a reaction to thought with ID ${req.params.thoughtId}` });
};

export const deleteReaction = async (req: Request, res: Response) => {
    res.status(200).json({ message: `Will DELETE a reaction with ID ${req.params.reactionId} from thought with ID ${req.params.thoughtId}`});
};