FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /root

# Add lockfile and package.jsons
FROM node:16-alpine AS build
COPY *.json ./
COPY apps/web/*.json ./apps/web/
COPY packages/config/*.json ./packages/config/
COPY packages/tsconfig/*.json ./packages/tsconfig/
RUN yarn install

# Copy source files
COPY apps/web/ ./apps/web/
COPY packages/** ./packages/
# Build
RUN yarn --cwd=apps/web/ build

# Start the Frontend Next.js application
EXPOSE 3000
RUN ['yarn', '--cwd', 'apps/web', 'start']