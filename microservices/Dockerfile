FROM node:16
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY index.js /app
EXPOSE 8001
CMD node index.js