import { ExecutionResult, graphql, GraphQLSchema } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { createSchema } from "../../src/utils/createSchema";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: unknown;
  }>;
}

let schema: GraphQLSchema;

export const graphQLRequest = async ({
  source,
  variableValues,
}: Options): Promise<ExecutionResult> => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({ schema, source, variableValues });
};
