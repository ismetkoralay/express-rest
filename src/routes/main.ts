import { Router, Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { mainValidators } from "./validators/main-validator";

const mainRouter = Router();

mainRouter.post("/api/v1/", mainValidators, validateRequest, async (req: Request, res: Response) => {
    res.send({});
});

export { mainRouter };