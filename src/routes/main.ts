import { Router, Request, Response } from "express";

const mainRouter = Router();

mainRouter.post("/api/v1/", async (req: Request, res: Response) => {
    res.send({});
});

export { mainRouter };