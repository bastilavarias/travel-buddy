import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ProfileImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  url: string;

  @Column({ nullable: false })
  publicID: string;

  @Column("bytea", { nullable: false })
  data: Buffer;
}
