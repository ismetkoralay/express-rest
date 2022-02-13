import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/custom-error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    res.status(err instanceof CustomError ? err.statusCode : 500).send({
        code: 1,
        msg: err.message
    });
};