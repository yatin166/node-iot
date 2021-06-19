import express from 'express';
import { DatabaseConfig } from './config/Database.config';
import { ServerConfig } from './config/Server.config';
import { MainAuthenticationController } from './controllers/base/Main.authentication.controller';
import { Server } from './server';

const authenticationServer = new Server(
    express(),
    ServerConfig.port(),
    new MainAuthenticationController(),
    DatabaseConfig.connectionPath()
);

authenticationServer
    .configure()
    .then(() => authenticationServer.up())
    .catch(error => console.log(`Error occurred in starting server ${error}`))
