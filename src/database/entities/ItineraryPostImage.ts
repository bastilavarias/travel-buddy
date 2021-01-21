import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItineraryPost from "./ItineraryPost";

@Entity()
export default class ItineraryPostImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  url: string;

  @Column({ nullable: true })
  publicID: string;

  @ManyToOne(() => ItineraryPost)
  post: ItineraryPost;
}
