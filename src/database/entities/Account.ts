import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Profile from "./Profile";
import AccountType from "./AccountType";

@Entity()
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column("text", { nullable: false })
  password: string;

  @Column("timestamp with time zone", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("boolean", { nullable: false })
  isVerified: boolean;

  @Column("boolean", { nullable: false, default: false })
  isDeleted: boolean;

  @Column("boolean", { nullable: false, default: true })
  isActive: boolean;

  @OneToOne(() => Profile, (profile) => profile.account)
  @JoinColumn()
  profile: Profile;

  @ManyToOne(() => AccountType)
  type: AccountType;
}
