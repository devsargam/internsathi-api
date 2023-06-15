import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import dbConnect from './db/index.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
dotenv.config();

dbConnect();

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
