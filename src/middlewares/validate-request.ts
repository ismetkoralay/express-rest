import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../models/custom-error";

// returns errors if validation encounters any errors
export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array().map(e => e.msg as string).join(", ");
        throw new CustomError(400, error);
    }

    next();
}