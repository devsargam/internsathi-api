import { Request, Response } from 'express';
import { UserModel } from '../db/models/userModel';
import { betterErrors } from '../utils/betterErrors';
import { createToken } from '../utils/createJwtToken';
import { IPayload, IUser } from '../types';

export const postSignup = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  try {
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = await UserModel.create({ username, email, password, role });
    const payload: IPayload = {
      email: newUser.email,
      role: newUser.role,
    }
    const token = createToken(payload);
    res.status(201).json({ token });
  } catch (e) {
    const error = betterErrors(e);
    res.status(400).json({ error });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const payload: IPayload = {
      email: user.email,
      role: user.role,
    };
    const token = createToken(payload);
    res.status(200).json({ token });
  } catch (error) {
    // @ts-ignore
    res.status(400).json({ error: error.message });
  }
};
