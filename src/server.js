import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import dbConnect from './db/index.js';
import authRoute from './routes/authRoute.js';
import internRoute from './routes/internRoute.js';
import applicationRoute from './routes/applicationRoute.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

dbConnect();

// Register routes
app.use('/api/auth', authRoute);
app.use('/api/internships', internRoute);
app.use('/api/applications', applicationRoute);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.clear();
  console.log(`Example app listening on port ${PORT}!`);
});
