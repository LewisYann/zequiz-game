const path = require("path");

/* get the right env file */
require("dotenv").config({
  path: path.resolve(
    __dirname,
    `./.env.${process.env.NODE_ENV || "development"}`
  ),
});

/* environment config object */
const config = {
  env: process.env.NODE_ENV || "development",
  development: {
    host: process.env.DB_HOST || "127.0.0.1",
    db: process.env.DB_DATABASE || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    port: process.env.DB_PORT || 5432,
  },
};

module.exports = [
  {
    name: "development",
    type: "postgres",
    database: config.development.db,
    synchronize: true,
    logging: config.env === "development",
    entities: [path.join(__dirname, "/dist/entities/**/*.js")],
    migrations: [path.join(__dirname, "/dist/migrations/**/*.js")],
    cli: {
      entitiesDir: "dist/entities",
      migrationsDir: "dist/migrations",
    },
    host: config.development.host,
    port: Number(config.development.port),
    username: config.development.user,
    password: config.development.password,
  },
];
