import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Entities
import { RuleSet } from "../entities/RuleSet";

export class RuleSetService {
  ruleSetRepository: Repository<RuleSet>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.ruleSetRepository = getManager().getRepository(RuleSet);
  }

  /**
   * Creates an instance of RuleSet.
   */
//   instantiate(data: Object): RuleSet | undefined {
//     return this.ruleSetRepository.create(data);
//   }

  /**
   * Inserts a new RuleSet into the database.
   */
  async insert(data: RuleSet): Promise<RuleSet> {
    this.logger.info("Create a new RuleSet", data);
    const newRule = this.ruleSetRepository.create(data);
    return await this.ruleSetRepository.save(newRule);
  }

  /**
   * Returns array of all users from db
   */
  async getAll(): Promise<RuleSet[]> {
    return await this.ruleSetRepository.find({relations: ["transactions"]});
  }

  /**
   * Returns a RuleSet by given id
   */
  async getById(id: string | number): Promise<RuleSet> {
    if (id) {
      return await this.ruleSetRepository.findOne(id);
    }
    return Promise.reject(false);
  }
  /**
   * update redemption limit
   */
  async reduceRedemption(id: string | number): Promise<object> {
    if (id) {
      let rule = await this.ruleSetRepository.findOne(id);
      if (rule.redemptionLimit > 0) {
            try {
                return await this.ruleSetRepository.update(id,
                { redemptionLimit : rule.redemptionLimit - 1});
            } catch (error) {
                return Promise.reject(error);
            }
      }

    }
    return Promise.reject(false);
  }
  /**
   * Updates the last failed logged date
   */
//   async setLastFailedLoggedDate(RuleSet: RuleSet): Promise<object> {
//     const userId: RuleSet = this.ruleSetRepository.getId(RuleSet);

//     try {
//       return await this.ruleSetRepository.update(userId, {
//         lastFailedLoggedDate: new Date()
//       });
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

}
