import { Request, Response } from 'express';

export const getAllUsers = async (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Will GET all users' });
    };

export const createUser = async (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Will CREATE a user' });
    }

export const getUserById = async (req: Request, res: Response) => {
    res.status(200).json({ message: `Will GET user with id ${req.params.userId}` });
    }

export const updateUser = async (req: Request, res: Response) => {
    res.status(200).json({ message: `Will UPDATE user with id ${req.params.userId}` });
    }

export const deleteUser = async (req: Request, res: Response) => {
    res.status(200).json({ message: `Will DELETE user with id ${req.params.userId}` });
    }