import express from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./routes/main";
import yaml from "yamljs";
import swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";
import path from "path";
import { errorHandler } from "./middlewares/error-handler";
import 'express-async-errors';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    const swaggerPath = path.resolve(__dirname, "./swagger.yaml");
    const swaggerDocument = yaml.load(swaggerPath);
    app.use("/api/v1/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(mainRouter);

app.use(errorHandler);

export { app };