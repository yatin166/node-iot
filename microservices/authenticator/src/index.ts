import express from 'express';
import { DatabaseConfig } from '../../common/config/Database.config';
import { ServerConfig } from '../../common/config/Server.config';
import { MainAuthenticationController } from './controllers/base/Main.authentication.controller';
import { Server } from './AuthenticatorServer';

const authenticationServer = new Server(
    express(),
    ServerConfig.authenticatorServerPort(),
    new MainAuthenticationController(),
    DatabaseConfig.connectionPath()
);

authenticationServer
    .configure()
    .then(() => authenticationServer.up())
    .catch(error => console.log(`Error occurred in starting server ${error}`))
