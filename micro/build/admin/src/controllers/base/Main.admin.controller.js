"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainAdminController = void 0;
var express_1 = __importDefault(require("express"));
var User_controller_1 = require("../User.controller");
var Path = {
    Api: '/api/v1',
    UserController: '/user'
};
var MainAdminController = /** @class */ (function () {
    function MainAdminController() {
        var _a;
        this.routerConfiguration = [];
        (_a = this.routerConfiguration).push.apply(_a, this.initRouters());
    }
    MainAdminController.prototype.initRouters = function () {
        var router = express_1.default.Router();
        return [
            {
                controller: new User_controller_1.UserController(router),
                path: this.configurePath(Path.UserController)
            }
        ];
    };
    MainAdminController.prototype.configurePath = function (path) {
        return Path.Api + path;
    };
    return MainAdminController;
}());
exports.MainAdminController = MainAdminController;
