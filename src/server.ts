import { app } from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const port = 4000;

const startApp = async () => {

    const connectionString = process.env.MONGO_URL;
    if (!connectionString) {
        throw new Error("You must provide MONGO_URL from environment");
    }

    try {
        await mongoose.connect(connectionString);
        console.log("Mongo connected");
    } catch (error) {
        console.log(error);
    }

    app.listen(port, () => {
        console.log("Listening on port 4000");
    });
}

startApp();