"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainAuthenticationController = void 0;
var express_1 = __importDefault(require("express"));
var AccessToken_service_1 = require("../../services/authentication/jwt/AccessToken.service");
var Login_service_1 = require("../../services/authentication/Login.service");
var RefreshToken_service_1 = require("../../services/authentication/jwt/RefreshToken.service");
var Register_service_1 = require("../../services/authentication/Register.service");
var Authentication_controller_1 = require("../Authentication.controller");
var Path = {
    Api: '/api/v1',
    AuthenticationController: '/auth',
    UserController: '/user'
};
var MainAuthenticationController = /** @class */ (function () {
    function MainAuthenticationController() {
        var _a;
        this.routerConfiguration = [];
        (_a = this.routerConfiguration).push.apply(_a, this.initRouters());
    }
    MainAuthenticationController.prototype.initRouters = function () {
        var router = express_1.default.Router();
        return [
            {
                controller: new Authentication_controller_1.AuthenticationController(router, new Login_service_1.LoginServiceImpl(new RefreshToken_service_1.RefreshTokenServiceImpl(), new AccessToken_service_1.AccessTokenServiceImpl()), new Register_service_1.RegisterServiceImpl()),
                path: this.configurePath(Path.AuthenticationController)
            }
        ];
    };
    MainAuthenticationController.prototype.configurePath = function (path) {
        return Path.Api + path;
    };
    return MainAuthenticationController;
}());
exports.MainAuthenticationController = MainAuthenticationController;
