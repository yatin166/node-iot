import express from 'express';
import { DatabaseConfig } from './config/Database.config';
import { ServerConfig } from './config/Server.config';
import { AdminServer } from "./DashboardServer";
import { MainDashboardController } from './controllers/base/Main.dashboard.controller';

const adminServer = new AdminServer(
    express(),
    ServerConfig.port(),
    new MainDashboardController(),
    DatabaseConfig.connectionPath()
);

adminServer
    .configure()
    .then(() => adminServer.up())
    .catch(error => console.log(`Error occurred in starting server ${error}`))