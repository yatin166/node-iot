FROM node:16.3.0-alpine
WORKDIR /dashboard
COPY package*.json /dashboard
RUN npm install
COPY . /dashboard
EXPOSE 8002
CMD npm run start:prod