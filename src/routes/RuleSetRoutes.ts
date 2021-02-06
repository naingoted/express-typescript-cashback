import { Router } from "express";
import { RuleSetController } from "../controllers/RuleSetController";
import { registerRuleSetValidations } from "../utils/Validator";
export class RuleSetRoutes {

    router: Router;
    public ruleSetController: RuleSetController = new RuleSetController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post("/", registerRuleSetValidations(), this.ruleSetController.registerRuleSet);
    }
}