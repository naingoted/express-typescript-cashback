import { Transaction } from "./../entities/Transaction";
import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";
import asyncWrapper from "async-wrapper-express-ts";

// Impoty Services
import { RuleSet } from "../entities/RuleSet";
import { RuleSetService } from "../services/RuleSetService";
import { TransactionService } from "../services/TransactionService";

import ResponseFormat from "../utils/ResponseFormat";

export class CashBackController {
  public getAllCashBacks = asyncWrapper(async (req: Request, res: Response) => {
    const ruleSetService = new RuleSetService();
    const transactionService = new TransactionService();
    const allTransaction = await transactionService.getAll();
    console.log(allTransaction);
    const resp = await Promise.all(allTransaction.map( async (transaction: Transaction) => {
      //
      if (
        transaction.date >= transaction.ruleset.startDate &&
        transaction.date <= transaction.ruleset.endDate &&
        transaction.ruleset.redemptionLimit > 0
      ) {
        await ruleSetService.reduceRedemption(transaction.ruleset.id);
        console.log(transaction.ruleset.id);
        return {
          transactionId: transaction.id,
          amount: transaction.ruleset.cashBack,
        };
      } else {
        console.log(":", transaction.id);
        return {
          transactionId: transaction.id,
          amount: 0,
        };
      }
    }));
    res.status(HttpStatus.OK).json(ResponseFormat.success(resp));
  });
}
