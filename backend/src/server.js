import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';


const app = express();


app.get("/",(req,res) => {
    res.send("hello world");
});

app.listen(ENV.PORT, () => {
    console.log("server is running on port:",ENV.PORT)
    connectDB()
});