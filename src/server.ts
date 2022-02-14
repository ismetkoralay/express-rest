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

    const dbName = process.env.DB_NAME;
    if(!dbName) {
        throw new Error("You must provide DB_NAME from environment")
    }

    try {
        // Connect to mongodb
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDb");
    } catch (error) {
        console.log(error);
    }

    app.listen(process.env.PORT || port, () => {
        console.log("Listening on port 4000");
    });
}

startApp();