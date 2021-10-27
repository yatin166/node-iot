import express from 'express';
import { ServerConfig } from '../../common/config/Server.config';
import { DashboardServer } from "./DashboardServer";
import { MainDashboardController } from './controllers/base/Main.dashboard.controller';

const dashboardServer = new DashboardServer(
    express(),
    ServerConfig.dashboardServerPort(),
    new MainDashboardController()
);

dashboardServer
    .configure()
    .then(() => dashboardServer.up())
    .catch(error => console.error(`Error occurred in starting server ${error}`))
