import { Router } from "express";
import { RuleSetRoutes } from "./routes/RuleSetRoutes";
import { TransactionRoutes } from "./routes/TransactionRoutes";
import { CashBackRoutes } from "./routes/CashBackRoutes";

const router: Router = Router();

router.use("/ruleset", new RuleSetRoutes().router);
router.use("/cashback", new CashBackRoutes().router);
router.use("/transaction", new TransactionRoutes().router);


export default router;
