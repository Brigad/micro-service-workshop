FROM node:16.13.1-alpine3.14

WORKDIR /opt/app

RUN npm i -g sequelize-cli

COPY package.json .
COPY packages/service-users/package.json ./packages/service-users/
COPY packages/service-contracts/package.json ./packages/service-users/
COPY packages/util-sequelize/package.json ./packages/util-sequelize/

RUN yarn

COPY . .

CMD yarn --cwd /opt/app/packages/service-${SERVICE}/database db:all && yarn --cwd /opt/app/packages/service-${SERVICE} start
