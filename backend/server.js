import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from './routes/authRoute.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoute)


app.get("/", (req, res) => {
    res.send("Welcome to ecommerce app");
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
  });