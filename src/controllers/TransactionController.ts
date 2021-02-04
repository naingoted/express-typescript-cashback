import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";
import asyncWrapper from "async-wrapper-express-ts";

// Import Services
import { Transaction } from "../entities/Transaction";
import { TransactionService } from "../services/TransactionService";


import ResponseFormat from "../utils/ResponseFormat";

export class TransactionController {
  public registerTransaction = asyncWrapper(
    async (req: Request, res: Response) => {
      const transactionService = new TransactionService();
      let transaction = new Transaction();
      // "date": "YYYY-mm-dd",
      // "customerId": 1,
      // "id": 1
      transaction.date = req.body.date;
      transaction.customerId = req.body.customerId;
      transaction.ruleset = req.body.id;

      transaction = await transactionService.insert(transaction);
      res.status(HttpStatus.CREATED).json(ResponseFormat.success(transaction));
    }
  );
}
