import { Response, Request } from 'express';

export const addFriend = async (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Will ADD a friend' });
};

export const deleteFriend = async (req: Request, res: Response) => {
    res.status(200).json({ message: `Will delete friend with ID ${req.params.friendId} from user with ID ${req.params.userId}` });
};