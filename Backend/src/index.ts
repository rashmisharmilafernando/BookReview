import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as process from "process";
import cors from 'cors';

import ReviewRoutes from "./routes/review.routes"; 

// invoke the express
const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,             
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL as string);
const db = mongoose.connection;

db.on('error', (error) => {
    console.log("DB Connection Error: ", error);
});

db.on('open', () => {
    console.log("DB Connected Successfully");
});

app.use('/review', ReviewRoutes); 

app.listen(8097, () => {
    console.log("Server started on port 8097");
});
