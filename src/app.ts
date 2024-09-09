import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swaggerConfig';

import dbConnect from './db/index';
import {
  applicationRouter,
  authRouter,
  internRouter,
} from './routes';

dotenv.config();

const app = express();

// Database Connection
dbConnect();

// Using necessary middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Middleware for Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/internships', internRouter);
app.use('/api/applications', applicationRouter);

// Health check route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'OK' });
});

export default app;
