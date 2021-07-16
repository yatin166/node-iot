"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Database_config_1 = require("../../config/Database.config");
var Server_config_1 = require("../../config/Server.config");
var DashboardServer_1 = require("./DashboardServer");
var Main_dashboard_controller_1 = require("./controllers/base/Main.dashboard.controller");
var dashboardServer = new DashboardServer_1.DashboardServer(express_1.default(), Server_config_1.ServerConfig.dashboardServerPort(), new Main_dashboard_controller_1.MainDashboardController(), Database_config_1.DatabaseConfig.connectionPath());
dashboardServer
    .configure()
    .then(function () { return dashboardServer.up(); })
    .catch(function (error) { return console.log("Error occurred in starting server " + error); });
