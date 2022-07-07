import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { userResolver } from "../resolvers/user";
import { roundResolver } from "../resolvers/round";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [userResolver, roundResolver],
    validate: false,
  });
