import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Profile from "./Profile";

@Entity()
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column("text", { nullable: false })
  password: string;

  @Column({ nullable: false })
  type: string;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToOne(() => Profile, (profile) => profile.account)
  @JoinColumn()
  profile: Profile;
}
