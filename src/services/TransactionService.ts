import { RuleSet } from "./../entities/RuleSet";
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
    return await this.transactionRepository.find();
  }
  async getAllByCashBack(): Promise<Transaction[]> {
    return await this.transactionRepository
      .createQueryBuilder("transaction")
      .select(["transaction.transactionId", "transaction.cashBack"])
      .andWhere("transaction.cashBack <> 0")
      .getMany();
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

  /**
   * returns Transaction(s) by CustomerID
   */
  async getValidTransForCashBack(
    customerId: string | number,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    if (customerId && startDate && endDate) {
      const query = await this.transactionRepository
        .createQueryBuilder("transaction")
        .andWhere("transaction.date >= :startDate", { startDate })
        .andWhere("transaction.date <= :endDate", { endDate })
        .andWhere("transaction.customerId = :customerId", { customerId })
        .orderBy({ "transaction.id": "DESC" })
        .getMany();
      return query;
    }
    return Promise.reject(false);
  }
  /**
   * check transaction Id exits
   */
  // async hasTid(id: number) : Promise<Transaction[]> {
  //   return await this.transactionRepository.find({ where: { transactionId: id }})
  // }
  async hasTid(id: number): Promise<boolean> {
    const isExistsQuery = (query: string) => `SELECT EXISTS(${query}) AS "exists"`;
    const [{ exists }] = await this.transactionRepository.query(isExistsQuery(
      this.transactionRepository.createQueryBuilder("transaction")
        .andWhere("transaction.transactionId = ? ", {id} )
        .getQuery(),
    ), [id]);
    if (exists === "1") return true;
    return false;
  }
  /**
   * update cashback for each transaction id (for updating all the older transactions)
   */
  // async updateTransCashBack(id: number, cashBack: number) : Promise<object> {
  //   if (id) {
  //     const transaction = await this.transactionRepository.findOne(id);
  //     if(transaction.id){
  //       try {
  //         return await this.transactionRepository.find
  //       }
  //     }
  //   }
  //   return Promise.reject(false)
  // }
}
