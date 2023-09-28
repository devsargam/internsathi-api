import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import dbConnect from './db/index';
import authRoute from './routes/auth.route';
import internRoute from './routes/intern.route';
import applicationRoute from './routes/application.route';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Database Connection
dbConnect();
// Using necessary middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Register routes
app.use('/api/auth', authRoute);
app.use('/api/internships', internRoute);
app.use('/api/applications', applicationRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
