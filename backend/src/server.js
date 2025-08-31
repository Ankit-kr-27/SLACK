import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js";


const app = express();

app.use(express.json()); //req.body
app.use(clerkMiddleware())//to request auth

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/",(req,res) => {
    res.send("hello world");
});

const startServer = async () => {
    try {
        await connectDB();
        if (ENV.NODE_ENV !=="production"){
            app.listen(ENV.PORT, () => {
    console.log("server is running on port:",ENV.PORT)
});
        }
    } catch (error) {
        console.log("error starting the server:",error );
        process.exit(1);       
    }
}

startServer();

export default app;