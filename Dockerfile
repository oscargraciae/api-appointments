FROM node:14

RUN mkdir -p /usr/src/api
# ENV PORT 8000

WORKDIR /usr/src/api

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . /usr/src/api

# RUN yarn build

# CMD [ "yarn", "server"]
CMD [ "yarn", "dev"]
# EXPOSE 8000
# CMD [ "yarn", "start", "-p", "8000" ]