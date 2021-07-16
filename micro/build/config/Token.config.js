"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenConfig = void 0;
var TokenConfig = /** @class */ (function () {
    function TokenConfig() {
    }
    TokenConfig.accessTokenSecret = function () {
        if (process.env.ACCESS_TOKEN_SECRET)
            return process.env.ACCESS_TOKEN_SECRET;
        return TokenConfig.tokenSecret;
    };
    TokenConfig.refreshToken = function () {
        if (process.env.REFRESH_TOKEN_SECRET && process.env.REFRESH_TOKEN_EXPIRY) {
            return {
                expiresInSeconds: parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10),
                secret: process.env.REFRESH_TOKEN_SECRET
            };
        }
        return {
            expiresInSeconds: 60 * 60 * 2,
            secret: this.tokenSecret
        };
    };
    TokenConfig.accessToken = function () {
        if (process.env.ACCESS_TOKEN_SECRET && process.env.ACCESS_TOKEN_EXPIRY) {
            return {
                expiresInSeconds: parseInt(process.env.ACCESS_TOKEN_EXPIRY, 10),
                secret: process.env.ACCESS_TOKEN_SECRET
            };
        }
        return {
            expiresInSeconds: 60 * 2,
            secret: this.tokenSecret
        };
    };
    TokenConfig.tokenSecret = 'HeD7y2RjKXcXUVKMrnfcNKwlyenM0bIk';
    return TokenConfig;
}());
exports.TokenConfig = TokenConfig;
