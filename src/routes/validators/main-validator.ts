import { body, ValidationChain } from "express-validator";

const dateFormat = "YYYY-MM-DD";
const startDateValidation = body("startDate").isDate({ format: dateFormat }).withMessage(`Format of startDate is not valid. It should be ${dateFormat}`);
const endDateValidation = body("endDate").isDate({ format: dateFormat }).withMessage(`Format of endDate is not valid. It should be ${dateFormat}`);
const minCountValidation = body("minCount").notEmpty().withMessage("minCount cannot be empty.").isInt({ min: 0 }).withMessage("minCount must be a valid integer.");
const maxCountValidation = body("maxCount").notEmpty().withMessage("maxCount cannot be empty.").isInt({ min: 0 }).withMessage("maxCount must be a valid integer.");
const minMaxComparison = body("maxCount").custom((value, { req }) => {
    const maxCount = parseInt(value);
    const minCount = parseInt(req.body.minCount);
    if (maxCount <= minCount) {
        throw new Error("maxCount must be greater than minCount");
    }

    return true;
})

let validationList: Array<ValidationChain> = [];
validationList.push(startDateValidation, endDateValidation, minCountValidation, maxCountValidation, minMaxComparison);

export { validationList as mainValidators };