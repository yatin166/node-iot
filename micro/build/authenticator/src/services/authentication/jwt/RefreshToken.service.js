"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenServiceImpl = void 0;
var Token_config_1 = require("../../../../../config/Token.config");
var JWT_service_1 = require("./JWT.service");
var RefreshTokenServiceImpl = /** @class */ (function (_super) {
    __extends(RefreshTokenServiceImpl, _super);
    function RefreshTokenServiceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RefreshTokenServiceImpl.prototype.getToken = function (payload) {
        return this.create(payload, Token_config_1.TokenConfig.refreshToken());
    };
    RefreshTokenServiceImpl.prototype.verifyToken = function (token) {
        return this.verify(token, Token_config_1.TokenConfig.refreshToken().secret);
    };
    return RefreshTokenServiceImpl;
}(JWT_service_1.JWTServiceImpl));
exports.RefreshTokenServiceImpl = RefreshTokenServiceImpl;
