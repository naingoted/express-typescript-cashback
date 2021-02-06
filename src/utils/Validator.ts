import {Request, Response, NextFunction} from "express";
import Joi from "joi";

export function registerTransactionValidationRules() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            // date: Joi.date().format('YYYY-MM-DD').options({ convert: false })
            date: Joi.date()
        });
        // .with('username', 'birth_year')
        // .xor('password', 'access_token')
        // .with('password', 'repeat_password');
        await schema.validateAsync({
            date: req.body.date
        })
        .then(() => {
            next();
        })
        .catch((error: any) => {
            next({message: error.message});
        });
    };
}