import { Response, Request } from 'express';

export const addFriend = async (req: Request, res: Response) => {
    res.status(200).json({ message: `Will ADD a friend to user ID${req.params.userId}`});
};

export const deleteFriend = async (req: Request, res: Response) => {
    res.status(200).json({ message: `Will delete friend with ID ${req.params.friendId} from user with ID ${req.params.userId}` });
};