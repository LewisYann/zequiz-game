import { createConnection, getConnection, getConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Connection } from "typeorm";
import path from "path";


console.log(path.join(__dirname, "..", "/entities/*.ts"));


export const openDBConnection = async (drop = true): Promise<Connection> => {
  const name = process.env.NODE_ENV;
  const connectionOptions = await getConnectionOptions(name);
  return createConnection({
    ...connectionOptions,
    namingStrategy: new SnakeNamingStrategy(),
    name: "default",
    synchronize: drop,
    dropSchema: true,
    entities: [
      path.join(__dirname, "..", "/entities/*.ts")
    ],
    migrations: [
      path.join(__dirname, "..", "/migrations/*.ts")
    ]
  });
};
export const closeDBConnection = async (): Promise<void> => {
  await getConnection().close();
};
