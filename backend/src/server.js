import "../instrument.mjs"
import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js";
import chatRoutes from "./routes/chat.route.js";
import * as Sentry from "@sentry/node";


const app = express();

app.use(express.json()); //req.body
app.use(clerkMiddleware())//to request auth

app.get("/debug-sentry",(req,res) => {
    throw new Error("My first sentry error!");
});

app.get("/",(req,res) => {
    res.send("hello world");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);


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