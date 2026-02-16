FROM node:20-alpine AS base
ENV NODE_ENV=development
WORKDIR /usr/src/app
RUN npm install -g turbo

FROM base AS build-landing
WORKDIR /usr/src/app
COPY package*.json .
COPY turbo.json .
COPY apps/landing/package*.json ./apps/landing/
RUN npm install 
COPY apps/landing ./apps/landing
RUN npm run build --filter=landing

FROM base AS build-api
WORKDIR /usr/src/app
COPY package*.json .
COPY turbo.json .
COPY apps/api/package*.json ./apps/api/
RUN npm install 
COPY apps/api ./apps/api
RUN npm run build --filter=landing

FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY apps/api/package*.json .
RUN npm install --omit=dev

COPY --from=build-api /usr/src/app/apps/api/dist ./dist
COPY --from=build-landing /usr/src/app/apps/landing/dist ./client

CMD [ "npm", "run", "start:prod" ]