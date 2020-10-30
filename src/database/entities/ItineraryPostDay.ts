import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItineraryPost from "./ItineraryPost";
import ItineraryPostDayActivity from "./ItineraryPostDayActivity";

@Entity()
export default class ItineraryPostDay extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { nullable: false })
  day: number;

  @Column({ nullable: false })
  destination: string;

  @Column({ nullable: false })
  transportation: string;

  @Column({ nullable: false })
  lodging: string;

  @ManyToOne(() => ItineraryPost)
  post: ItineraryPost;

  @OneToMany(() => ItineraryPostDayActivity, (activity) => activity.day)
  @JoinColumn()
  activities: ItineraryPostDayActivity[];
}
