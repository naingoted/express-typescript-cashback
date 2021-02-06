import { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";
import { registerTransactionValidationRules } from "../utils/Validator";
export class TransactionRoutes {

    router: Router;
    public transactionController: TransactionController = new TransactionController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post("/", registerTransactionValidationRules(), this.transactionController.registerTransaction);
    }
}