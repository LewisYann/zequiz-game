# dependencies installing stage
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# buid stage
FROM node:16-alpine AS build

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S starter_user -u 1001

COPY tsconfig.json ./
COPY package.json yarn.lock ./
COPY --from=deps /app/node_modules ./node_modules
COPY /src ./src
RUN yarn build
RUN chown starter_user ./dist

