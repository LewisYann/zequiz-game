import { createConnection, getConnection, getConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Connection } from "typeorm";

console.log(process.env)
export const openDBConnection = async (drop = false): Promise<Connection> => {
  const name = process.env.NODE_ENV;
  const connectionOptions = await getConnectionOptions(name);
  console.log(connectionOptions)

  return createConnection({
    ...connectionOptions,
    namingStrategy: new SnakeNamingStrategy(),
    name: "default",
    synchronize: drop,
    dropSchema: drop,
  });
};
export const closeDBConnection = async (): Promise<void> => {
  await getConnection().close();
};
