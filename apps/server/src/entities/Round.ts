import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Quiz } from ".";

@ObjectType()
@Entity()
export class Round extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  publicId!: string;
  
  @Field(() => [Quiz])
  @OneToMany(() => Quiz, (quiz) => quiz.round)
  quiz!: Quiz[];

  @Field(() => Number)
  @Column()
  score!: number;

  @Field(() => String)
  @Column()
  roundType!: String;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
