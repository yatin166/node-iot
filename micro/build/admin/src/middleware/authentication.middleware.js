"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Token_config_1 = require("../../../config/Token.config");
var authenticationMiddleware = function (req, res, next) {
    var token = req.headers['autharization'];
    if (typeof token === 'string') {
        try {
            var accessTokenPayload = jsonwebtoken_1.default.verify(token, Token_config_1.TokenConfig.accessTokenSecret());
            if (accessTokenPayload)
                next();
        }
        catch (error) {
            res.status(403).json({ message: 'TOKEN EXPIRED' });
        }
    }
    else {
        res.status(403).json({ message: 'TOKEN EXPIRED' });
    }
};
exports.authenticationMiddleware = authenticationMiddleware;
