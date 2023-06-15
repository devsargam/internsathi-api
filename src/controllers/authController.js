import companyModel from '../db/models/companyModel.js';
import { betterErrors } from '../utils/betterErrors.js';

export const getSignup = (req, res) => {
  res.send('signup');
};

export const postSignup = async (req, res) => {
  const { companyName, email, password } = req.body;
  try {
    const company = await companyModel.create({ companyName, email, password });
    res.status(201).json({ company });
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
  res.send('login');
};
