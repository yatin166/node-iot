FROM node:16
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm config set registry https://registry.npmjs.org/

RUN npm install

COPY . .

EXPOSE 8002

CMD [ "npm run", "start:admin:prod" ]