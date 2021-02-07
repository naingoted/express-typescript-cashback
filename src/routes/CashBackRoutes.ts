import { RuleSetController } from "./../controllers/RuleSetController";
import { Router } from "express";
import { CashBackController } from "../controllers/CashBackController";
import { registerRuleSetValidations } from "../utils/Validator";
export class CashBackRoutes {
  router: Router;
  public cashBackController: CashBackController = new CashBackController();
  public ruleSetController: RuleSetController = new RuleSetController();

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/", this.cashBackController.getAllCashBacks);
    this.router.post(
      "/",
      registerRuleSetValidations(),
      this.ruleSetController.registerRuleSet
    );
  }
}
