import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { RuleSet } from "./RuleSet";

@Entity("transaction")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "date" })
  date: Date;
  // this could have many to one relationship to Customer
  @Column({ nullable: true, default: 0 })
  customerId: number;

  @ManyToOne((type) => RuleSet, (ruleset) => ruleset.transactions)
  ruleset: RuleSet;
}
