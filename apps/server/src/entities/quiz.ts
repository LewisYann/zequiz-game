import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

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
  @CreateDateColumn()
  movieUrl: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
