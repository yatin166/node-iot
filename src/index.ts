import express from 'express';
import { DatabaseConfig } from './config/Database.config';
import { ServerConfig } from './config/Server.config';
import { MainController } from './controllers/base/Main.controller';
import { Server } from './server';

const expressServer = new Server(
    express(),
    ServerConfig.port(),
    new MainController(),
    DatabaseConfig.connectionPath()
);

expressServer
    .configure()
    .then(() => expressServer.up())
    .catch(error => console.log(`Error occurred in starting server ${error}`))
