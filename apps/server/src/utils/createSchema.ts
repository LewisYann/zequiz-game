import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { userResolver } from "../resolvers/user";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [userResolver],
    validate: false,
  });
