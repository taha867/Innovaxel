import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import cors from 'cors';
import connectDB from './db/connectDB.js';


dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

//Middlewares (a function that runs between request and response)
app.use(express.json({ limit: '50mb' })); //it allows u to pars(convert) incoming data from request into json formate
app.use(express.urlencoded({ limit: '50mb', extended: true }));;//express.urlencoded allows u to pars(convert) form data into req.body
                                                //if true even if request body has some nested objects u can pars and vice versa

// Routes
app.use('/api', urlRoutes);



app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`));