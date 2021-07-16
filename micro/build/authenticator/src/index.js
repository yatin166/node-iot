"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Database_config_1 = require("../../config/Database.config");
var Server_config_1 = require("../../config/Server.config");
var Main_authentication_controller_1 = require("./controllers/base/Main.authentication.controller");
var server_1 = require("./server");
var authenticationServer = new server_1.Server(express_1.default(), Server_config_1.ServerConfig.authenticatorServerPort(), new Main_authentication_controller_1.MainAuthenticationController(), Database_config_1.DatabaseConfig.connectionPath());
authenticationServer
    .configure()
    .then(function () { return authenticationServer.up(); })
    .catch(function (error) { return console.log("Error occurred in starting server " + error); });
