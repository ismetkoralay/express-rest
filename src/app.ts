import express from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./routes/main";

const app = express();

app.use(helmet());
app.use(cors());

app.use(mainRouter);

export { app };