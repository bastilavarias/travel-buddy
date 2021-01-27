import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItineraryPost from "./ItineraryPost";
import Account from "./Account";
import ItineraryPostInquiryReply from "./ItineraryPostInquiryReply";

@Entity()
export default class ItineraryPostInquiry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  message: string;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => ItineraryPost)
  post: ItineraryPost;

  @ManyToOne(() => Account)
  author: Account;

  @OneToMany(() => ItineraryPostInquiryReply, (reply) => reply.inquiry)
  replies: ItineraryPostInquiryReply[];
}
