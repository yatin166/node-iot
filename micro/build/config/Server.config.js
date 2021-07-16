"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
var ServerConfig = /** @class */ (function () {
    function ServerConfig() {
    }
    ServerConfig.authenticatorServerPort = function () {
        if (process.env.SERVER_PORT)
            return parseInt(process.env.SERVER_PORT, 10);
        return 8000;
    };
    ServerConfig.dashboardServerPort = function () {
        if (process.env.SERVER_PORT)
            return parseInt(process.env.SERVER_PORT, 10);
        return 8001;
    };
    ServerConfig.adminServerPort = function () {
        if (process.env.SERVER_PORT)
            return parseInt(process.env.SERVER_PORT, 10);
        return 8002;
    };
    return ServerConfig;
}());
exports.ServerConfig = ServerConfig;
