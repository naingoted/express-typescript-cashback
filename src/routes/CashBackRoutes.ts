import { Router } from "express";
import { CashBackController } from "../controllers/CashBackController";

export class CashBackRoutes {

    router: Router;
    public cashBackController: CashBackController = new CashBackController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.get("/", this.cashBackController.getAllCashBacks);
    }
}