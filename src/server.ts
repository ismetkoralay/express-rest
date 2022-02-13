import { app } from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
import 'express-async-errors';

dotenv.config();

const port = 4000;

const startApp = async () => {

    const connectionString = process.env.MONGO_URL;
    if (!connectionString) {
        throw new Error("You must provide MONGO_URL from environment");
    }

    try {
        await mongoose.connect(connectionString, {
            dbName: process.env.DB_NAME,
            retryWrites: true,
            w: "majority"
        });
        console.log("Connected to MongoDb");
    } catch (error) {
        console.log(error);
    }

    app.listen(port, () => {
        console.log("Listening on port 4000");
    });
}

startApp();