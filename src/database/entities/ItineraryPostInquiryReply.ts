import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Account from "./Account";
import ItineraryPostInquiry from "./ItineraryPostInquiry";

@Entity()
export default class ItineraryPostInquiryReply extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  message: string;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => ItineraryPostInquiry)
  inquiry: ItineraryPostInquiry;

  @ManyToOne(() => Account)
  author: Account;
}
