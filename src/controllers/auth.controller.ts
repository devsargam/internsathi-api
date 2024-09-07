import { Request, Response } from 'express';
import { UserModel } from '../db/models';
import { betterErrors } from '../utils/betterErrors';
import { createToken } from '../utils/createJwtToken';
import { IPayload, IUser } from '../types';
import {
  SignUpValidation,
  SignInValidation,
} from '../validations/auth.validation';

export const postSignup = async (req: Request, res: Response) => {
  const parseData = SignUpValidation.parse(req.body);

  const { username, email, password, role } = parseData;
  try {
    // Check if user exists
    const user = await UserModel.findOne({
      email,
    });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: 'User already exists' });
    }
    const newUser = await UserModel.create({
      username,
      email,
      password,
      role,
    });
    const payload: IPayload = {
      email: newUser.email,
      role: newUser.role,
    };
    const token = createToken(payload);
    res.status(201).json({ token });
  } catch (e) {
    const error = betterErrors(e);
    res.status(400).json({ success: false, error });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const parseData = SignInValidation.parse(req.body);

  const { email, password } = parseData;

  try {
    const user = await UserModel.login(email, password);
    const payload: IPayload = {
      email: user.email,
      role: user.role,
    };
    const token = createToken(payload);
    res
      .status(200)
      .json({
        success: true,
        token,
        message: 'User Login successfull',
      });
  } catch (error) {
    // @ts-ignore
    res.status(400).json({ success: false, error: error.message });
  }
};
