import { InputType, Field } from "type-graphql";
import { Round } from "./entities";
import { Request, Response } from "express";

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

declare global {
  namespace Express {
    interface Session {
      user?: Number
    }
  }
}

export type AppContext = {
  req: Request & { session: Express.Session };
  res: Response;
};
