import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItineraryPost from "./ItineraryPost";
import Account from "./Account";

@Entity()
export default class ItineraryPostReview extends BaseEntity {
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

  @ManyToOne(() => Account)
  author: Account;
}
