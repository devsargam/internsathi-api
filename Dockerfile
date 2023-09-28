FROM node:18

# Resetting the environment variables
ENV MONGO_URL=mongodb://mongodb:27017/internsathi

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .

RUN yarn build

CMD ["yarn", "start"]
