import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import dbConnect from './db/index';
import { applicationRouter, authRouter, internRouter } from './routes';

const app = express();

// Database Connection
dbConnect();
// Using necessary middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


console.log(cors)
// Register routes
app.use('/api/auth', authRouter);
app.use('/api/internships', internRouter);
app.use('/api/applications', applicationRouter);
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

export default app;