import { AuthenticationError, ApolloError } from "apollo-server-express";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "../types";

@Resolver()
export class userResolver {
  @Mutation(() => User)
  async register(@Arg("input") input: UserInput): Promise<User | undefined> {
    try {
      return User.create(input).save();
    }
    catch {
      throw new ApolloError('Cannot register this user, please try later', 'ERROR_REGISTER');
    }
  }

  @Query(() => User, { nullable: true })
  async getByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("username") username: String,
    @Arg("password") password: String
  ): Promise<User | undefined | { error: String, status: Number }> {
    const user = User.findOne({ where: { username, password } });

    if (user === undefined) {
      throw new AuthenticationError('This user not be found, please check your ids and try again');
    }
    return user;
  }
}
