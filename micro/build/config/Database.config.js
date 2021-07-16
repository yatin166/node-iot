"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
var DatabaseConfig = /** @class */ (function () {
    function DatabaseConfig() {
    }
    DatabaseConfig.connectionPath = function () {
        return "mongodb://" + this.getHostName() + ":" + this.getPort() + "/" + this.getDatabaseName();
    };
    DatabaseConfig.getHostName = function () {
        if (process.env.ENVIRONMENT === 'PROD')
            return 'mongo';
        return 'localhost';
    };
    DatabaseConfig.getPort = function () {
        if (process.env.DB_PORT)
            return process.env.DB_PORT;
        return '27017';
    };
    DatabaseConfig.getDatabaseName = function () {
        if (process.env.DB_NAME)
            return process.env.DB_NAME;
        return 'iot';
    };
    return DatabaseConfig;
}());
exports.DatabaseConfig = DatabaseConfig;
