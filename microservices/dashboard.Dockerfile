FROM node:16
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "./"]
RUN npm install
COPY /dashboard /app
COPY /config /app
EXPOSE 8001
CMD [ "npm run", "start:dashboard:prod" ]