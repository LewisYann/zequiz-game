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
console.log(process.env)
module.exports = [
  {
    name: "development",
    type: "mysql",
    database: config.development.db,
    synchronize: true,
    logging: config.env === "development",
    entities: [path.join(__dirname, "/src/entities/**/*.ts")],
    migrations: [path.join(__dirname, "/src/migrations/**/*.ts")],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migrations",
    },
    host: config.development.host,
    port: Number(config.development.port),
    username: config.development.user,
    password: config.development.password,
  },
];
