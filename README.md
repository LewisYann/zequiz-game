
#   Ze Quiz 



## Environment Variables
### Server

- cd `server` directory
- create `dbdata` directory. It is the volume that will be use by Postgres
- create `.env.development` file and add the following variables (adapt to your environment)

```
# environment type
APP_ENV=development
# database host
DB_HOST=starter-db
# database name
DB_DATABASE=starter-dev
# database username
DB_USER=valentino
# database password
DB_PASSWORD=valery
# database port number on the host
DB_PORT=5432
# db connection retry number
DB_CONNECTION_RETRIES=5
# db connection retry timeout
TIMEOUT_BEFORE_RETRY=5000
# web server port
PORT=4000
# back-end URL
BACK_END_URL=http://localhost:4000/
# front-end URL
FRONT_END_URL=http://localhost:3000
# sudio Apollo graphql URL
STUDIO_APOLLO_GRAPHQL_URL=https://studio.apollographql.com
STUDIO_APOLLO_GRAPHQL_URL=https://studio.apollographql.com
PICTURE_URL=http://image.tmdb.org/t/p/w500
MOVIE_URL=https://api.themoviedb.org
API_KEY=f797a48d40f189b038093795534b113b
```

### Web

- cd `web` directory
- create `.env.local` file and add the following variables (adapt to your environment)

```
# back-end URL
NEXT_PUBLIC_BACK_END_URL=http://localhost:4000/graphql
```
## Installation

### Automatical setup


Install automatically project by lunch setup.sh

```bash
  ./setup.sh
```
### Manual  setup

Install automatically project by following this step:

- Step 1 : setup and install all depencies
```bash
yarn install //Install global mono repo dependencies
yarn workspace server install //Install server dependencies
yarn workspace web install //Install frontend server depencidencies
```

- Step 2 : Prepare husky
```bash
yarn prepare //In root project
```
- Step 3 : Generate graphql schema
You need to run server before with 
```bash
yarn workspace server dev
```
Finally run 
```bash
yarn workspace web gen 
```

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

#### Install dependencies
 
Use one methode about Installion section

#### Database configuration
 
Update your `.env` file with correct informations of your locally database and then, set you db type `apps/server/src/utils/index.ts`

```bash
   return createConnection({
    type: 'postgres', //update this line, 
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
```



#### Start the server

```bash
  yarn dev 
```

#### or  run build with 
```bash
  yarn build
  yarn start  
```



## Running Tests

To run tests, run the following command

```bash
  yarn test
```


## Frontend route reference

#### Login

```http
 /login
```
#### Register an user

```http
 /register
```

#### play game

```http
 /play
```



## Features

- Login
Just complete login form and submit it

- Register
 Complete Register form and submit 

- Playing Ze quiz game
#### Game Rules

1- Here you don't need to login.

2- You lost when time is out, provide wrong answers or you have a limitation quiz

3- You need to select type of round that you want to play. 

4- First round level is Level 20. This one, limit the quiz number of the roud to 20.

5- Second round level is Unlimited. No limitation of quiz. Le round close when provide one wrong response to the answers

6- If you lose, you can replay by clicking Replay game








## Mono repo Architecture 

Global Architecture used 

#### Frontend route


| Folder | Workspace     | Role                       |
| :-------- | :------- | :-------------------------------- |
| `/apps/web`      | `web` | Contain Frontend app |
| `/apps/server`      | `server` | Contain server app |
| `/packages/config`      | `config` | Contain eslint and jest config  |
| `/packages/tsconfig`      | `tsconfig` | TypeScript configuration |
| `.storybook`      | `` | storybook config |
| `.husky`      | `` | husky config |
| `turbo.json`      | `` | turbo repo configuration |


If you want to add an another app,it will be added in `/apps` folder, and another configuration structure in `/packages`

## to do

- create a make file to easy up the starting : (Done)
- Add prettier and es-lint config  (Done)
- add husky for pre-commit stage  (Done)
- add mono repo with `turbo repo`  (Done)
- add ci steps to manage many environment  (Done)
- add storybook  (Done)