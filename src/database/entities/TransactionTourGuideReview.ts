import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Account from "./Account";

@Entity()
export default class TransactionTourGuideReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  text: string;

  @Column("int", { nullable: false })
  rating: number;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Account)
  account: Account;

  @ManyToOne(() => Account)
  author: Account;
}
