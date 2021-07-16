"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenServiceImpl = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Token_config_1 = require("../../config/Token.config");
var AccessTokenServiceImpl = /** @class */ (function () {
    function AccessTokenServiceImpl() {
    }
    AccessTokenServiceImpl.prototype.verify = function (token) {
        return jsonwebtoken_1.default.verify(token, Token_config_1.TokenConfig.accessTokenSecret());
    };
    return AccessTokenServiceImpl;
}());
exports.AccessTokenServiceImpl = AccessTokenServiceImpl;
