import { InputType, Field, ObjectType } from "type-graphql";
import { Quiz, Round, User } from "./entities";
import { Request, Response } from "express";
import { Redis } from "ioredis";
import { Session, SessionData } from "express-session";

@InputType()
export class UserLoginInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password!: string;
}
@InputType()
export class UserInput {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  firstname!: string;

  @Field(() => String)
  lastname!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
@InputType()
export class QuizInput {

  @Field(() => Round)
  round!: Round;

  @Field(() => Boolean)
  adult!: boolean;

  @Field(() => String)
  actorName!: string;

  @Field(() => String)
  originalName!: string;

  @Field(() => String)
  actorPicture!: string;

  @Field(() => String)
  movieTitle!: string;

  @Field(() => String)
  movieDescription!: string;

  @Field(() => String)
  releaseDate!: string;

  @Field(() => String)
  movieUrl: Date;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

@InputType()
export class QuizCheckInput {

  @Field(() => String)
  id: Number;

  @Field(() => String)
  publicId: String;

  @Field(() => Boolean)
  response: Boolean;

  @Field(() => Number)
  score: Number;
}


export type AppContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { user: number };
  };
  res: Response;
  redis: Redis
};

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
export class roundResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Round, { nullable: true })
  round?: Round;
}

@ObjectType()
export class QuizResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Quiz, { nullable: true })
  quiz?: Quiz;
}


@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}