import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import express, { Request, Response, NextFunction } from "express";

import helmet from "helmet";
import morgan from "morgan";
import { createConnection } from "typeorm";
import config from "./config/config";
import routes from "./routes";
import cron from "cron";

// Import Utils
import * as swaggerDocument from "./utils/swagger/swagger.json";
import { Logger, ILogger } from "./utils/logger";

// Import Crons
// import { CurrencyCron } from "./crons/currency.cron";

// Import Middlewares
import { GenericErrorHandlers } from "./middlewares/GenericErrorHandler";
import nodeErrorHandler from "./middlewares/NodeErrorHandler";
import notFoundHandler from "./middlewares/NotFoundHandler";

export class Application {
  app: express.Application;
  config = config;
  logger: ILogger;
  CronJob = cron.CronJob;
  genericerrorHandlers: GenericErrorHandlers;

  constructor() {
    this.logger = new Logger(__filename);
    this.genericerrorHandlers = new GenericErrorHandlers();
    this.app = express();
    console.log("env", process.env.NODE_ENV);
    this.app.use(require("express-status-monitor")());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(
      morgan("dev", {
        skip: () => process.env.NODE_ENV === "test",
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use("/api", routes);
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
    this.app.use(this.genericerrorHandlers.genericErrorHandler);
    this.app.use(notFoundHandler);
  }

  setupDbAndServer = async () => {
    const conn = await createConnection();
    this.logger.info(
      `Connected to database. Connection: ${conn.name} / ${conn.options.database}`
    );

    await this.startServer();
  }

  startServer = (): Promise<boolean> => {
    // process.on('unhandledRejection', err => {
    //   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    //   console.log(err.name, err.message);
    //   // server.close(() => {
    //     process.exit(1);
    //   // });
    // });
    return new Promise((resolve, reject) => {
      this.app
        .listen(+this.config.port, this.config.host, () => {
          this.logger.info(
            `Server started at http://${this.config.host}:${this.config.port}`
          );
          resolve(true);
        })
        .on("error", nodeErrorHandler);
    });
  }
}
