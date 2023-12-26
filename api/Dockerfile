FROM node:16.20.1

WORKDIR /api

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]
