import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { Round } from "./Round";
@ObjectType()
@Entity()
export class Quiz extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Round)
  @ManyToOne(() => Round, (round) => round.quizzes)
  round!: Round;

  @Field(() => Boolean)
  @Column()
  adult!: boolean;

  @Field(() => String)
  @Column()
  actorName!: string;

  @Field(() => String)
  @Column()
  originalName!: string;

  @Field(() => String)
  @Column()
  actorPicture!: string;

  @Field(() => String)
  @Column()
  movieTitle!: string;

  @Field(() => String)
  @Column()
  movieDescription!: string;

  @Field(() => String)
  @Column()
  releaseDate!: string;

  @Field(() => String)
  @Column()
  movieUrl: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
