FROM node:16
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "tsconfig.json", "./"]
RUN npm install
COPY /authenticator ./authenticator
COPY /config ./config
EXPOSE 8000
CMD [ "npm", "run", "start:authenticator:prod" ]