import { createConnection, getConnection, Connection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import path from "path";


/* environment config object */

export const openDBConnection = async (drop = false): Promise<Connection> => {
  console.log(process.env)
  const config = {
    env: process.env.NODE_ENV || "development",
    development: {
      host: process.env.DB_HOST || "127.0.0.1",
      db: process.env.DB_DATABASE || "",
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      port: process.env.DB_PORT || 5432,
    }
  };
  return createConnection({
    type: 'postgres',
    database: config.development.db,
    namingStrategy: new SnakeNamingStrategy(),
    name: process.env.NODE_ENV,
    synchronize: drop,
    dropSchema: drop,
    logging: config.env === "development",
    entities: [
      path.join(__dirname, "..", "/entities/*.ts")
    ],
    migrations: [
      path.join(__dirname, "..", "/migrations/*.ts")
    ],
    cli: {
      entitiesDir: "/apps/server/src/entities/*.ts",
      migrationsDir: "/apps/server/.dist/*.ts",
    },
    host: config.development.host,
    port: Number(config.development.port),
    username: config.development.user,
    password: config.development.password
  });
};
export const closeDBConnection = async (): Promise<void> => {
  await getConnection().close();
};
