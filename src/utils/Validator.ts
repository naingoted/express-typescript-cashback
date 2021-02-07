import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function registerTransactionValidations() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      date: Joi.date().required(),
      id: Joi.number().required(),
      customerId: Joi.number().required(),
    });
    await schema
      .validateAsync({
        date: req.body.date,
        id: req.body.id,
        customerId: req.body.customerId,
      })
      .then(() => {
        next();
      })
      .catch((error: any) => {
        next({ message: error.message });
      });
  };
}
export function registerRuleSetValidations() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      budget: Joi.number().required(),
      cashback: Joi.number().required(),
    });
    await schema
      .validateAsync({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        cashback: req.body.cashback,
        budget: req.body.budget,
      })
      .then(() => {
        next();
      })
      .catch((error: any) => {
        next({ message: error.message });
      });
  };
}
