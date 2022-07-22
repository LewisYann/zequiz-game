import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import path from "path";
import dotenv from "dotenv";
import { openDBConnection } from "./utils/database";
import config from "./constants";
import { createSchema } from "./utils/createSchema";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";


dotenv.config({
  path: path.resolve(
    __dirname,
    `./.env.${process.env.NODE_ENV || "development"}`
  ),
});

const main = async () => {
  let retries = Number(config.dbConnectionRetries);
  const retryTimeout = Number(config.timeoutBeforeRetry);

  while (retries) {
    try {
      const conn = await openDBConnection();
      await conn.synchronize();
      await conn.runMigrations();
      break;
    } catch (error) {
      retries -= 1;
      console.log(error)
      console.log(`retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, retryTimeout));
    }
  }

  const app = express();
  // creating 24 hours from milliseconds
  //app.use(cookieParser("restxf"))
  const RedisStore = connectRedis(session);
  const redis = new Redis({ port: config.redis_port, host: config.redis_url });
  app.set("trust proxy", 1);


  // set up cors with express cors middleware
  app.use(
    cors({
      origin: [config.frontend_url, config.studio_apollo_graphql_url],
      credentials: true, // this allows to send back (to client) cookies
    })
  );
  //session middleware
  const oneDay = 1000 * 60 * 60 * 24;

  app.use(
    session({
      name: 'test',
      store: new RedisStore({
        client: redis,
        disableTouch: true
      }),
      cookie: {
        sameSite: "lax",
        httpOnly: true,
        maxAge: oneDay,
      },
      secret: config.secret_key,
      saveUninitialized: false,
      resave: false
    })
  );


  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }) => ({
      req,
      res,
      redis
    })
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(config.port, () => {
    console.log(`server started on port ${config.port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
