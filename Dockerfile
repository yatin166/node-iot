FROM node:16.3.0-alpine
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE 8000
CMD npm run start:prod