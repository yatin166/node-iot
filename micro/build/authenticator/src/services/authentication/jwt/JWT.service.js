"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTServiceImpl = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWTServiceImpl = /** @class */ (function () {
    function JWTServiceImpl() {
    }
    JWTServiceImpl.prototype.create = function (payload, config) {
        return jsonwebtoken_1.default.sign(payload, config.secret, { expiresIn: config.expiresInSeconds });
    };
    JWTServiceImpl.prototype.verify = function (token, signInSecret) {
        return jsonwebtoken_1.default.verify(token, signInSecret);
    };
    return JWTServiceImpl;
}());
exports.JWTServiceImpl = JWTServiceImpl;
