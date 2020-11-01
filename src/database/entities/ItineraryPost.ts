import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItineraryImage from "./ItineraryPostImage";
import ItineraryPostDay from "./ItineraryPostDay";
import { ColumnNumericTransformer } from "../helper";

@Entity()
export default class ItineraryPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("numeric", {
    nullable: true,
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column("int", { nullable: true })
  pax: number;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("boolean", { nullable: false, default: false })
  isDeleted: boolean;

  @Column("boolean", { nullable: false, default: true })
  isActive: boolean;

  @OneToMany(() => ItineraryImage, (image) => image.post)
  @JoinColumn()
  images: ItineraryImage[];

  @OneToMany(() => ItineraryPostDay, (day) => day.post)
  @JoinColumn()
  days: ItineraryPost[];
}
