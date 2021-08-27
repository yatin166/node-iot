FROM node:16
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "./"]
RUN npm install
COPY . /app
EXPOSE 8000
CMD [ "npm run", "start:admin:prod" ]