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
    return await this.ruleSetRepository.find({ relations: ["transactions"] });
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
   *
   * can reward cashback
   */
  async canRewardCashback(id: string | number ): Promise<boolean> {
    const rule = await this.ruleSetRepository.findOne(id);
    if (
      rule.redemptionLimit > rule.redemption &&
      Number(rule.budget) > Number(rule.cashBack)
    ) { return true; }
    return false;
  }
  /**
   * update redemption limit
   */
  async rewardCashback(id: string | number): Promise<object> {
    if (id) {
        try {
          const rule = await this.ruleSetRepository.findOne(id);
          return await this.ruleSetRepository.update(id, {
            redemption: rule.redemption + 1,
            budget: Number(rule.budget) - Number(rule.cashBack),
          });
        } catch (error) {
          return Promise.reject(error);
        }
    }
    return Promise.reject(false);
  }
  /**
   * check valid transaction
   */
  async isValidTransaction(date: Date): Promise<RuleSet | boolean> {
    if (date) {
      const query = await this.ruleSetRepository
        .createQueryBuilder("ruleset")
        .andWhere("ruleset.startDate <= :date", { date: date })
        .andWhere("ruleset.endDate >= :date", { date: date })
        .andWhere("ruleset.budget > ruleset.cashBack")
        .andWhere("ruleset.redemptionLimit > ruleset.redemption")
        .orderBy({ "ruleset.cashBack": "DESC" })
        .getOne();

      if (query) {
        return query;
      } else {
        return false;
      }
    } else {
      return false;
    }
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
