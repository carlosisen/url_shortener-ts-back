import { Request, Response, NextFunction } from "express";
import {body, validationResult} from "express-validator"


export const userValidator = [
    body("password")
        .exists()
        .withMessage("Password must exist")
        .trim()
        .isLength({ min: 6 })
        .withMessage("El password debe contener al menos 5 caracteres"),
    body("email")
        .exists()
        .trim()
        .isEmail()
        .normalizeEmail()
        .escape()
        .withMessage("insert a valid email"),
    body("name")
        .notEmpty()
        .isString()
        .blacklist("{}[]$")
        .trim()
        .escape()
        .withMessage("there is an error in your name"),
];

export const loginValidator = [
    body("password")
        .exists()
        .withMessage("Password must exist")
        .trim()
        .isLength({ min: 6 })
        .withMessage("El password debe contener al menos 5 caracteres"),
    body("email")
        .exists()
        .trim()
        .isEmail()
        .normalizeEmail()
        .escape()
        .withMessage("insert a valid email")
];

export const urlValidator = [
    body("url")
        .isURL({require_protocol: true, require_host: true})
        .trim()
        .withMessage("there is an error in you url, remember insert protocols https, http, etc.."),
    body("notes")
        .optional()
        .isString()
        .blacklist("{}[]$*")
        .trim()
        .escape()
        .withMessage("there is an error in your notes")
];




export const backValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next();
};

