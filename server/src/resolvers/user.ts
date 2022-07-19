import { validateRegister } from "../utils/validate";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { AppContext, UserInput, UserResponse } from "../types";
import argon2 from "argon2";



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
            field: "UsernameOrMail",
            message: "This username and mail is already taken"
          }
        ]
      }
    }
    input.password = await argon2.hash(input.password);
    const userSaving = await User.create(input).save();

    return { user: userSaving }

  }

  @Query(() => UserResponse)
  async getByUsername(
    @Arg("username") username: string,
    @Ctx() { }: AppContext
  ): Promise<UserResponse> {

    const user = await User.findOne({ where: { username } });

    if (user === undefined) {
      return {
        errors: [
          {
            field: "username",
            message: "This user doesn't found"
          }
        ]
      }
    }

    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: AppContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "This username doesn't exist"
          }
        ]
      }
    }
    const checkPassword = await argon2.verify(user.password, password);
    if (!checkPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }
    req.session.user = user.id

    return { user };
  }
}
