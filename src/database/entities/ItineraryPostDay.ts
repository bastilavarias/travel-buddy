import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItineraryPost from "./ItineraryPost";
import ItineraryPostDayDestination from "./ItineraryPostDayDestination";
import ItineraryPostDayActivity from "./ItineraryPostDayActivity";

@Entity()
export default class ItineraryPostDay extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { nullable: false })
  day: number;

  @Column({ nullable: false })
  transportation: string;

  @Column({ nullable: false })
  lodging: string;

  @ManyToOne(() => ItineraryPost)
  post: ItineraryPost;

  @OneToOne(() => ItineraryPostDayDestination)
  @JoinColumn()
  destination: ItineraryPostDayDestination;

  @OneToMany(() => ItineraryPostDayActivity, (activity) => activity.day)
  @JoinColumn()
  activities: ItineraryPostDayActivity[];
}
