import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Account from "./Account";

@Entity()
export default class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  nationality: string;

  @Column("date", {
    nullable: false,
  })
  birthDate: Date;

  @Column({ nullable: false })
  sex: string;

  @OneToOne(() => Account, (account) => account.profile)
  account: Account;
}
