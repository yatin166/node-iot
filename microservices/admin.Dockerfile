FROM node:16
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "tsconfig.json", "./"]
RUN npm install
COPY /admin ./admin
COPY /common ./common
EXPOSE 8002
CMD [ "npm", "run", "start:admin:prod" ]