FROM node:16
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . /app
EXPOSE 8002
CMD [ "npm run", "start:admin:prod" ]