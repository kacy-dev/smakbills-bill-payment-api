import express, { Application } from "express";
import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import{ errorHandler } from './middlewares/errorHandler';


const app: Application = express();
app.use(cors());
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'API is running smoothly',
  });
});

// 404 handler for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route Not Found'});
});


// Error handling middleware
app.use(errorHandler);

export default app;
