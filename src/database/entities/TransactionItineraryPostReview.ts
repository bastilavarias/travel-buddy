import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Account from "./Account";
import Transaction from "./Transaction";
import ItineraryPost from "./ItineraryPost";

@Entity()
export default class TransactionItineraryPostReview extends BaseEntity {
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

  @ManyToOne(() => ItineraryPost)
  post: ItineraryPost;

  @OneToOne(() => Transaction)
  @JoinColumn({ name: "transactionId" })
  transaction: Transaction;

  @ManyToOne(() => Account)
  author: Account;
}
