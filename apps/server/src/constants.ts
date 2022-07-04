import { config } from "dotenv";
import { resolve } from "path";

config({
  path: resolve(__dirname, `../.env.${process.env.NODE_ENV || "development"}`),
});

export default {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT as string, 10) || 4000,
  backend_url: process.env.BACK_END_URL || "",
  frontend_url: process.env.FRONT_END_URL || "",
  studio_apollo_graphql_url: process.env.STUDIO_APOLLO_GRAPHQL_URL || "",
  dbConnectionRetries: process.env.DB_CONNECTION_RETRIES || 5,
  timeoutBeforeRetry: process.env.TIMEOUT_BEFORE_RETRY || 5000,
};
