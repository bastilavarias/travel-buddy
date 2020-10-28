import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItineraryPostDay from "./ItineraryPostDay";

@Entity()
export default class ItineraryPostDayDestination extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  country: string;

  @OneToOne(() => ItineraryPostDay)
  day: ItineraryPostDay;
}
