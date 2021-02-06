import { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";
import { registerTransactionValidations } from "../utils/Validator";
export class TransactionRoutes {

    router: Router;
    public transactionController: TransactionController = new TransactionController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post("/", registerTransactionValidations(), this.transactionController.registerTransaction);
    }
}