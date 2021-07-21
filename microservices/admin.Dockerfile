FROM node:16.3.0-alpine
WORKDIR /service
COPY package*.json /service
RUN npm install
COPY ./admin /service
COPY ./config /service
EXPOSE 8001
CMD npm run start:prod