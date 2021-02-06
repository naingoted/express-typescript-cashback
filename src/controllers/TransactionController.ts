import { Request, Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import asyncWrapper from "async-wrapper-express-ts";

// Import Services
import { Transaction } from "../entities/Transaction";
import { TransactionService } from "../services/TransactionService";
import { RuleSetService } from "../services/RuleSetService";

import ResponseFormat from "../utils/ResponseFormat";

export class TransactionController {
  public registerTransaction = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const transactionService = new TransactionService();
      const ruleSetService = new RuleSetService();
      let transaction = new Transaction();
      if (!req.body.date) {
        next({ message: "date field is required" });
      }
      if (!req.body.customerId) {
        next({ message: "customerId field is required" });
      }
      transaction.date = req.body.date;
      transaction.customerId = req.body.customerId;
      transaction.transactionId = req.body.id;
      const ruleSet = await ruleSetService.isValidTransaction(req.body.date);
      let deducted = false;
      if (ruleSet) {
        // if transaction is valid
        // get highest ruleset.cashBack, get minTransaction
        const { cashBack, minTransactions, startDate, endDate, id } = ruleSet;
        if (minTransactions === 1) {
          // insert ruleset.cashBack -> transaction.cashback
          deducted = await ruleSetService.canRewardCashback(id);
          if (deducted) {
            // insert cashBack
            transaction.cashBack = cashBack;
            transaction = await transactionService.insert(transaction);
            if (transaction) {
              // deduct budget
              await ruleSetService.rewardCashback(id);
            }
          }
        } else {
          // get transactions based on request.customeId and request.Date
          const cashBackTrans = await transactionService.getValidTransForCashBack(
            req.body.customerId,
            startDate,
            endDate
          );
          // if exists and count >= minTran (3)
          if (
            cashBackTrans.length &&
            cashBackTrans.length + 1 >= minTransactions
          ) {
            // update current/(all) transactions with cashback with between ruleSet.startDate and ruleSet.endDate
            deducted = await ruleSetService.canRewardCashback(id);
            if (deducted) {
              // insert cashBack
              transaction.cashBack = cashBack;
              transaction = await transactionService.insert(transaction);
              if (transaction) {
                // deduct budget
                await ruleSetService.rewardCashback(id);
              }
            }
          } else {
            transaction = await transactionService.insert(transaction);
          }
        }

        res
          .status(HttpStatus.CREATED)
          .json(ResponseFormat.success(transaction));
      } else {
        next({ message: "invalid transaction" });
      }
    }
  );
}
