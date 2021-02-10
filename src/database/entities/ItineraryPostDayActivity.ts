import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItineraryPostDay from "./ItineraryPostDay";

@Entity()
export default class ItineraryPostDayActivity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => ItineraryPostDay, {
    onDelete: "CASCADE",
  })
  day: ItineraryPostDay;
}
