import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

import { Transaction } from "./Transaction";

@Entity("ruleset")
@Index(["startDate", "endDate"])
export class RuleSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "date" })
  startDate: Date;

  @Column({ nullable: false, type: "date" })
  endDate: Date;

  @Column({ default: 0 })
  redemptionLimit: number;
  // to keep track of redemptions
  @Column({ default: 0 })
  redemption: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  cashBack: number;

  @Column({ default: 1 })
  minTransactions: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  budget: number;
}
