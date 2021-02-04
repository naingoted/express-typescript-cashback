import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Transaction } from "./Transaction";

@Entity("ruleset")
export class RuleSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "date" })
  startDate: Date;

  @Column({ nullable: false, type: "date" })
  endDate: Date;

  @Column()
  redemptionLimit: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  cashBack: number;

  @OneToMany((type) => Transaction, (transaction) => transaction.ruleset)
  transactions: Transaction[];
}
