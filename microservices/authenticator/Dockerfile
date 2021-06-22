FROM node:16.3.0-alpine
WORKDIR /authenticator
COPY package*.json /authenticator
RUN npm install
COPY . /authenticator
EXPOSE 8000
CMD npm run start:prod