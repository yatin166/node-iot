import express from 'express';
import { ServerConfig } from '../../common/config/Server.config';
import { AdminServer } from "./AdminServer";
import { MainAdminController } from './controllers/base/Main.admin.controller';

const adminServer = new AdminServer(
    express(),
    ServerConfig.adminServerPort(),
    new MainAdminController()
);

adminServer
    .configure()
    .then(() => adminServer.up())
    .catch(error => console.log(`Error occurred in starting server ${error}`))