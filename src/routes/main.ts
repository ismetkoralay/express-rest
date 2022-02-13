import { Router, Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { mainValidators } from "./validators/main-validator";
import { recordService } from "../services/record-service";

const mainRouter = Router();

mainRouter.post("/api/v1/", mainValidators, validateRequest, async (req: Request, res: Response) => {
    const result = await recordService.get(req.body.startDate as Date, req.body.endDate as Date, req.body.minCount as number, req.body.maxCount as number);
    res.send(result);
});

export { mainRouter };