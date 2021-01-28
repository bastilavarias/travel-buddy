import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItineraryPost from "./ItineraryPost";
import Account from "./Account";
import TransactionItineraryPostReview from "./TransactionItineraryPostReview";
import TransactionTourGuideReview from "./TransactionTourGuideReview";

@Entity()
export default class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { unique: true, nullable: false })
  customNumber: string;

  @Column("timestamp with time zone", {
    nullable: false,
  })
  fromDate: Date;

  @Column("timestamp with time zone", {
    nullable: false,
  })
  toDate: Date;

  @Column("boolean", { nullable: false, default: false })
  isDone: boolean;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => ItineraryPost)
  post: ItineraryPost;

  @ManyToOne(() => Account)
  client: Account;

  @ManyToOne(() => Account)
  tourGuide: Account;

  @OneToOne(() => TransactionItineraryPostReview, { nullable: true })
  @JoinColumn()
  postReview: TransactionItineraryPostReview;

  @OneToOne(() => TransactionTourGuideReview, { nullable: true })
  @JoinColumn()
  tourGuideReview: TransactionTourGuideReview;
}
