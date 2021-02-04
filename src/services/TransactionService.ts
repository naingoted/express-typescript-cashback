import { Transaction } from "./../entities/Transaction";
import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

export class TransactionService {
  transactionRepository: Repository<Transaction>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.transactionRepository = getManager().getRepository(Transaction);
  }

  /**
   * Inserts a new Transaction into the database.
   */
  async insert(data: Transaction): Promise<Transaction> {
    this.logger.info("Create a new Transaction", data);
    const newTransaction = this.transactionRepository.create(data);
    return await this.transactionRepository.save(newTransaction);
  }

  /**
   * Returns array of all users from db
   */
  async getAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find({relations: ["ruleset"]});
  }

  /**
   * Returns a Transaction by given id
   */
  async getById(id: string | number): Promise<Transaction> {
    if (id) {
      return await this.transactionRepository.findOne(id);
    }
    return Promise.reject(false);
  }
}
