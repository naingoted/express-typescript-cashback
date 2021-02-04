import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { getRepository } from "typeorm";
// import catchAsync from "../utils/catchAsync";
import asyncWrapper from "async-wrapper-express-ts";

// Impoty Services
import { RuleSet } from "../entities/RuleSet";
import { RuleSetService } from "../services/RuleSetService";

import ResponseFormat from "../utils/ResponseFormat";

export class RuleSetController {
  public registerRuleSet = asyncWrapper(
    async (req: Request, res: Response) => {
      const ruleSetService = new RuleSetService();
      let rule = new RuleSet();
      // "startDate": "YYYY-mm-dd",
      // "endDate": "YYYY-mm-dd",
      // "cashback": 2.00,
      // "redemptionLimit": 10
      rule.startDate = req.body.startDate;
      rule.endDate = req.body.endDate;
      rule.cashBack = req.body.cashback;
      rule.redemptionLimit = req.body.redemptionLimit;
      rule = await ruleSetService.insert(rule);
      res.status(HttpStatus.CREATED).json(ResponseFormat.success(rule));
    }
  );
}
