import { validateRegister } from "../utils/validate";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { AppContext, UserInput } from "../types";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class userResolver {
  @Mutation(() => UserResponse)
  async register(@Arg("input") input: UserInput): Promise<UserResponse> {
    const errors = validateRegister(input);
    if (errors) {
      return { errors };
    }
    const user = await User.findAndCount({ where: [{ username: input.username }, { email: input.email }] });

    if (user[1] > 0) {
      return {
        errors: [
          {
            field: "Username, Mail",
            message: "This username and mail is already taken"
          }
        ]
      }
    }
    const userSaving = await User.create(input).save();

    return { user: userSaving }

  }

  @Query(() => UserResponse)
  async getByUsername(
    @Arg("username") username: string,
    @Ctx() { req }: AppContext
  ): Promise<UserResponse> {
    console.log(
      "resa", req.session
    )
    const user = await User.findOne({ where: { username } });

    if (user === undefined) {
      return {
        errors: [
          {
            field: "username",
            message: "this user does not found"
          }
        ]
      }
    }

    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: String,
    @Arg("password") password: String,
    @Ctx() { req }: AppContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username, password } });

    if (user === undefined) {
      return {
        errors: [
          {
            field: "username and password",
            message: "check your username and password"
          }
        ]
      }
    }

    req.session.user = 2
    req.session.save()
    return { user };
  }
}
