import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";
import asyncWrapper from "async-wrapper-express-ts";

// Impoty Services
import { TransactionService } from "../services/TransactionService";

import ResponseFormat from "../utils/ResponseFormat";

export class CashBackController {
  public getAllCashBacks = asyncWrapper(async (req: Request, res: Response) => {
    const transactionService = new TransactionService();
    const allTransaction = await transactionService.getAllByCashBack();
    res.status(HttpStatus.OK).json(ResponseFormat.success(allTransaction));
  });
}
