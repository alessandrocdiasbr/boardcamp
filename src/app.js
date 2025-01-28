import express from 'express';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware.js';
import gamesRouter from './routes/gamesRouter.js';
import customersRouter from './routes/customersRouter.js';
import rentalsRouter from './routes/rentalsRouter.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/games', gamesRouter);
app.use('/customers', customersRouter);
app.use('/rentals', rentalsRouter);

app.use(errorMiddleware);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});