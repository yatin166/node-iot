"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainDashboardController = void 0;
var express_1 = __importDefault(require("express"));
var TimeSeries_controller_1 = require("../TimeSeries.controller");
var Path = {
    Api: '/api/v1',
    TimeSeriesController: '/data'
};
var MainDashboardController = /** @class */ (function () {
    function MainDashboardController() {
        var _a;
        this.routerConfiguration = [];
        (_a = this.routerConfiguration).push.apply(_a, this.initRouters());
    }
    MainDashboardController.prototype.initRouters = function () {
        var router = express_1.default.Router();
        return [
            {
                controller: new TimeSeries_controller_1.TimeSeriesController(router),
                path: this.configurePath(Path.TimeSeriesController)
            }
        ];
    };
    MainDashboardController.prototype.configurePath = function (path) {
        return Path.Api + path;
    };
    return MainDashboardController;
}());
exports.MainDashboardController = MainDashboardController;
