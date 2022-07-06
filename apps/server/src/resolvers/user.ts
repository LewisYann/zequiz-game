import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "../types";

@Resolver()
export class userResolver {
  @Mutation(() => User)
  async register(@Arg("input") input: UserInput): Promise<User | undefined> {
    return User.create(input).save();
  }

  @Query(() => User, { nullable: true })
  async getByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }

  @Mutation(() => User,{ nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<User | undefined | { error: String, status: Number }> {
    const user = User.findOne({ where: { username, password } });

    if (user === undefined) {
      return { error: "Invalid username or password", status: 401 };
    }
    return user;
  }
}
