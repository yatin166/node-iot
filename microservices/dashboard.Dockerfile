FROM node:16
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "tsconfig.json", "./"]
RUN npm install
COPY /dashboard ./dashboard
COPY /config ./config
EXPOSE 8001
CMD [ "npm", "run", "start:dashboard:prod" ]