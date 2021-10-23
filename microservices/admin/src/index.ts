import express from 'express';
import { DatabaseConfig } from '../../common/config/Database.config';
import { ServerConfig } from '../../common/config/Server.config';
import { AdminServer } from "./AdminServer";
import { MainAdminController } from './controllers/base/Main.admin.controller';

const adminServer = new AdminServer(
    express(),
    ServerConfig.adminServerPort(),
    new MainAdminController(),
    DatabaseConfig.connectionPath()
);

adminServer
    .configure()
    .then(() => adminServer.up())
    .catch(error => console.log(`Error occurred in starting server ${error}`))