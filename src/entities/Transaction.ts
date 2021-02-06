import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

import { RuleSet } from "./RuleSet";

@Entity("transaction")
@Unique(["transactionId"])
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  transactionId: number;

  @Column({ nullable: false, type: "date" })
  date: Date;

  @Column({ nullable: false, default: 0 })
  customerId: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  cashBack: number;
}
