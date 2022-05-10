# typescript-fullstack-starter

A typescript fullstack starter with all modern tools for coding quickly and softly

## Why

### Javascript fatigue

### set up new project faster

### master some key concepts (without switching between to many tools)

## what

## how

### front libraries

### back libraries

### overall strategy

## requirements

you need the followings tool installed in your environment

- docker
- docker-compose
- node `16.13.1` and bigger
- yarn

## Set up

:warning: If your are working on windows system, you will need to create your own entrypoint.sh (in server folder) with the command inside the provided, then delete the provided.This is because windows end of line character (and others) are different from linux one.

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
```

- create `.env.database` file and add the following variables (adapt to your environment).

```
POSTGRES_PASSWORD=valery
POSTGRES_USER=valentino
POSTGRES_DB=starter-dev
```

- Make sure you have the same environment variables for database in both env file
- run `yarn`
- run `yarn build`

### Web

- cd `web` directory
- create `.env.local` file and add the following variables (adapt to your environment)

```
# back-end URL
NEXT_PUBLIC_BACK_END_URL=http://localhost:4000/graphql
```

- run `yarn`

## launch

- run `sudo docker-compose up`. The sudo is needed only for the first launch
- all your updates are reflected to the container. You can code peacefully

### server

- go to `https://studio.apollographql.com/sandbox/explorer`

### web

- go to `http://localhost:3000/register`

## Docs

### overall

- [typescript](https://www.typescriptlang.org/)
- [graphql](https://graphql.org/)
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [Ben Awad](https://www.youtube.com/watch?v=I6ypD7qv3Z8)

### front

- [Next Js](https://nextjs.org/)
- [urql](https://formidable.com/open-source/urql/)
- [graphql-codegen](https://www.graphql-code-generator.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Formik](https://formik.org/)

### back

- [express](https://expressjs.com/)
- [Apollo server](https://www.apollographql.com/docs/apollo-server/)
- [type-graphql](https://typegraphql.com/)
- [Typeorm](https://typeorm.io/)

## to do

- create a make file to easy up the starting
- Add prettier and es-lint config
- add husky for pre-commit stage
- add mono repo with `turbo repo`
- add ci steps to manage many environment
- add storybook
