import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Quiz } from "./quiz";

@ObjectType()
@Entity()
export class Round extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Quiz)
  @OneToMany(() => Quiz, (quiz) =>quiz.round)
  quizzes!: Quiz[];

  @Field(() => Number)
  @Column()
  score!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
