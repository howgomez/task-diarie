import morgan from "morgan";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config()


const app = express();
app.use(morgan("dev"));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
express.urlencoded()
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes)
export default app;