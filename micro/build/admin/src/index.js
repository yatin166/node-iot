"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Database_config_1 = require("../../config/Database.config");
var Server_config_1 = require("../../config/Server.config");
var AdminServer_1 = require("./AdminServer");
var Main_admin_controller_1 = require("./controllers/base/Main.admin.controller");
var adminServer = new AdminServer_1.AdminServer(express_1.default(), Server_config_1.ServerConfig.adminServerPort(), new Main_admin_controller_1.MainAdminController(), Database_config_1.DatabaseConfig.connectionPath());
adminServer
    .configure()
    .then(function () { return adminServer.up(); })
    .catch(function (error) { return console.log("Error occurred in starting server " + error); });
