import { UserModel } from '../db/models/userModel.js';
import { betterErrors } from '../utils/betterErrors.js';
import { createToken } from '../utils/createJwtToken.js';

export const getSignup = (req, res) => {
  res.send('signup');
};

export const postSignup = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = await UserModel.create({ username, email, password, role });
    const payload = { id: newUser._id, role: role ?? 'user' };
    const token = createToken(payload);
    res.status(201).json({ token });
  } catch (e) {
    console.log(e);
    const error = betterErrors(e);
    res.status(400).json({ error });
  }
};

export const getLogin = (req, res) => {
  res.send('login');
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const payload = { id: user._id, role: user.role };
    const token = createToken(payload);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
