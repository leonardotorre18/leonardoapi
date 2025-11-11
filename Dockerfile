FROM node:20-alpine AS base

FROM base AS development
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
CMD [ "npm", "run", "start:dev" ]

FROM base AS build
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM base AS production
RUN npm install -g nest
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --only=production
COPY --from=build /usr/src/app/dist/ dist/
CMD [ "npm", "run", "start:prod" ]