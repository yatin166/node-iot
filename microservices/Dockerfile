FROM node:16.3.0-alpine
WORKDIR /service
COPY package*.json /service
RUN npm install
COPY . .
EXPOSE 8001
CMD npm run start:prod