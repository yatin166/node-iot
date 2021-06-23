FROM node:16.3.0-alpine
WORKDIR /admin
COPY package*.json /admin
RUN npm install
COPY . /admin
EXPOSE 8001
CMD npm run start:prod