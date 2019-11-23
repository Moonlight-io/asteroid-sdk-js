"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var node_log_it_1 = require("node-log-it");
var rpc_1 = require("./rpc");
var rpc_error_codes_1 = require("./constants/rpc-error-codes");
var rest_1 = require("./rest");
var helpers_1 = require("./helpers");
var MODULE_NAME = 'AsteroidDomainUser';
var DEFAULT_OPTIONS = {
    networkType: 'production',
    networkConfig: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    autoUpdateTokens: true,
    id: '0',
    loggerOptions: {},
};
var AsteroidDomainUser = (function () {
    function AsteroidDomainUser(options) {
        if (options === void 0) { options = {}; }
        this.options = lodash_1.merge({}, DEFAULT_OPTIONS, options);
        this.validateOptionalParameters();
        this.currentAccessToken = this.options.accessToken;
        this.currentRefreshToken = this.options.refreshToken;
        this.logger = new node_log_it_1.Logger(MODULE_NAME, this.options.loggerOptions);
        this.logger.debug('constructor completes.');
    }
    Object.defineProperty(AsteroidDomainUser.prototype, "baseUrl", {
        get: function () {
            if (this.options.networkConfig) {
                return this.options.networkConfig.asteroidDomainUserBaseUrl;
            }
            if (this.options.networkType) {
                return helpers_1.NetworkHelper.getAsteroidDomainUserBaseUrl(this.options.networkType);
            }
            throw new Error('Unable to determine baseUrl.');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsteroidDomainUser.prototype, "accessToken", {
        get: function () {
            return this.currentAccessToken;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsteroidDomainUser.prototype, "refreshToken", {
        get: function () {
            return this.currentRefreshToken;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsteroidDomainUser.prototype, "id", {
        get: function () {
            return this.options.id;
        },
        enumerable: true,
        configurable: true
    });
    AsteroidDomainUser.prototype.setAccessToken = function (token) {
        this.currentAccessToken = token;
    };
    AsteroidDomainUser.prototype.setRefreshToken = function (token) {
        this.currentRefreshToken = token;
    };
    AsteroidDomainUser.prototype.getVersionInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, rest_1.rest.user.getVersion(this.baseUrl)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AsteroidDomainUser.prototype.requestPasswordReset = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('requestPasswordReset triggered.');
                        req = {
                            email: email,
                        };
                        return [4, rpc_1.rpc.user.requestPasswordReset(this.baseUrl, req, this.id)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AsteroidDomainUser.prototype.loginOauth = function (provider, oauthPayload) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('loginOauth triggered.');
                        req = {
                            provider: provider,
                            payload: oauthPayload,
                        };
                        return [4, rpc_1.rpc.user.loginOauth(this.baseUrl, req, this.id)];
                    case 1:
                        res = _a.sent();
                        this.setAccessToken(res.access_token);
                        this.setRefreshToken(res.refresh_token);
                        return [2];
                }
            });
        });
    };
    AsteroidDomainUser.prototype.newAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('newAccessToken triggered.');
                        req = {
                            refresh_token: this.refreshToken,
                        };
                        return [4, rpc_1.rpc.user.newAccessToken(this.baseUrl, req, this.id)];
                    case 1:
                        res = _a.sent();
                        this.setAccessToken(res.access_token);
                        return [2];
                }
            });
        });
    };
    AsteroidDomainUser.prototype.validateOptionalParameters = function () {
        if (!this.options.networkType && !this.options.networkConfig) {
            throw new Error("Require to provide either 'networkType' or 'networkConfig'.");
        }
        if (this.options.id === undefined) {
            throw new Error("Require to provide 'id'.");
        }
    };
    AsteroidDomainUser.prototype.invokeOrRefreshToken = function (method, req) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1, tokenReq, tokenRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        return [4, method(this.baseUrl, req, this.id)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        if (err_1.code !== rpc_error_codes_1.rpcErrorCodes.InvalidJwtToken) {
                            throw err_1;
                        }
                        if (!this.options.autoUpdateTokens) {
                            throw err_1;
                        }
                        tokenReq = { refresh_token: this.refreshToken };
                        return [4, rpc_1.rpc.user.newAccessToken(this.baseUrl, tokenReq, this.id)];
                    case 3:
                        tokenRes = _a.sent();
                        this.setAccessToken(tokenRes.access_token);
                        return [4, method(this.baseUrl, req, this.id)];
                    case 4: return [2, _a.sent()];
                    case 5: return [2];
                }
            });
        });
    };
    return AsteroidDomainUser;
}());
exports.AsteroidDomainUser = AsteroidDomainUser;
//# sourceMappingURL=asteroid-domain-user.js.map