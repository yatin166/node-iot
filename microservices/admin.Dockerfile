FROM node:16
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "./"]
RUN npm install
COPY /admin /app
COPY /config /app
EXPOSE 8002
CMD [ "npm run", "start:admin:prod" ]