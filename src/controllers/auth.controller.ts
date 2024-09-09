import bcrypt from 'bcrypt';
import { IPayload } from '../types';
import { UserModel } from '../db/models';
import { Request, Response } from 'express';
import { betterErrors } from '../utils/betterErrors';
import { createToken } from '../utils/createJwtToken';
import {
  SignUpValidation,
  SignInValidation,
} from '../validations/auth.validation';

export const postSignup = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const parseData = SignUpValidation.parse(req.body);
    const { username, email, password, role } = parseData;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Generate a JWT token
    const payload: IPayload = {
      email: newUser.email,
      role: newUser.role,
    };
    const token = createToken(payload);

    // Respond with success
    res
      .status(201)
      .json({
        success: true,
        token,
        message: 'User signup successful',
      });
  } catch (e) {
    // Handle validation or server errors
    const error = betterErrors(e);
    res.status(400).json({ success: false, error });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const parseData = SignInValidation.parse(req.body);
    const { email, password } = parseData;

    // Check if the user exists and verify password
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const payload: IPayload = {
      email: user.email,
      role: user.role,
    };
    const token = createToken(payload);

    // Respond with success
    res.status(200).json({
      success: true,
      token,
      message: 'User login successful',
    });
  } catch (error) {
    // Handle any errors that occur during processing
    const errorMessage = betterErrors(error);
    res.status(400).json({ success: false, error: errorMessage });
  }
};
