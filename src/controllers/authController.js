import jwt from 'jsonwebtoken';

import companyModel from '../db/models/companyModel.js';
import { betterErrors } from '../utils/betterErrors.js';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1500s',
  });
};

export const getSignup = (req, res) => {
  res.send('signup');
};

export const postSignup = async (req, res) => {
  const { companyName, email, password } = req.body;
  try {
    const company = await companyModel.create({ companyName, email, password });
    const token = createToken(company.email);
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
    const company = await companyModel.login(email, password);
    const token = createToken(company.email);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
