FROM node:16
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "./"]
RUN npm config get registry
RUN ls
RUN npm install
COPY . /app
EXPOSE 8002
CMD [ "npm run", "start:admin:prod" ]