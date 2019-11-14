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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const node_log_it_1 = require("node-log-it");
const build_url_1 = __importDefault(require("build-url"));
const rpc_1 = require("./rpc");
const constants_1 = require("./constants");
const rest_1 = require("./rest");
const MODULE_NAME = 'AsteroidDomainUser';
const DEFAULT_OPTIONS = {
    networkType: 'production',
    networkConfig: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    autoUpdateTokens: true,
    id: '0',
    loggerOptions: {},
};
class AsteroidDomainUser {
    constructor(options = {}) {
        this.options = lodash_1.merge({}, DEFAULT_OPTIONS, options);
        this.validateOptionalParameters();
        this.currentAccessToken = this.options.accessToken;
        this.logger = new node_log_it_1.Logger(MODULE_NAME, this.options.loggerOptions);
        this.logger.debug('constructor completes.');
    }
    get baseUrl() {
        if (this.options.networkConfig) {
            return this.options.networkConfig.asteroidDomainUserBaseUrl;
        }
        if (this.options.networkType) {
            if (this.options.networkType === 'production') {
                return 'https://user.asteroid.moonlight.io';
            }
            if (this.options.networkType === 'stage') {
                return 'https://stage-user.asteroid.moonlight.io';
            }
        }
        throw new Error('Unable to determine baseUrl.');
    }
    get rpcUrl() {
        return build_url_1.default(this.baseUrl, {
            path: '/rpc',
        });
    }
    get accessToken() {
        return this.currentAccessToken;
    }
    get refreshToken() {
        return this.options.refreshToken;
    }
    get id() {
        return this.options.id;
    }
    getVersionInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield rest_1.rest.user.getVersion(this.baseUrl);
        });
    }
    registerEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('registerEmail triggered.');
            const req = {
                email,
            };
            yield rpc_1.rpc.user.registerEmail(this.rpcUrl, req, this.id);
        });
    }
    registerEmailWithSecret(email, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('registerEmailWithSecret triggered.');
            const req = {
                email,
                secret,
            };
            const res = yield rpc_1.rpc.user.registerEmailWithSecret(this.rpcUrl, req, this.id);
            return res.dynamic_token;
        });
    }
    updatePassword(password, dynamicToken, tokenType) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('updatePassword triggered.');
            const req = {
                password,
                dynamic_token: dynamicToken,
                token_type: tokenType,
            };
            yield rpc_1.rpc.user.updatePassword(this.rpcUrl, req, this.id);
        });
    }
    updatePasswordJwt(password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('updatePasswordJwt triggered.');
            const req = {
                access_token: this.accessToken,
                password,
            };
            yield this.invokeOrRefreshToken(rpc_1.rpc.user.updatePasswordJwt, req);
        });
    }
    requestPasswordReset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('requestPasswordReset triggered.');
            const req = {
                email,
            };
            yield rpc_1.rpc.user.requestPasswordReset(this.rpcUrl, req, this.id);
        });
    }
    validateOptionalParameters() {
        if (!this.options.networkType && !this.options.networkConfig) {
            throw new Error(`Require to provide either 'networkType' or 'networkConfig'.`);
        }
        if (!this.options.accessToken) {
            throw new Error(`Require to provide 'accessToken'.`);
        }
        if (this.options.autoUpdateTokens && !this.options.refreshToken) {
            throw new Error(`Require to provide 'refreshToken' when 'autoUpdateTokens' is enabled.`);
        }
        if (this.options.id === undefined) {
            throw new Error(`Require to provide 'id'.`);
        }
    }
    invokeOrRefreshToken(method, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield method(this.rpcUrl, req, this.id);
            }
            catch (err) {
                if (err.code !== constants_1.rpcErrorCodes.InvalidJwtToken) {
                    throw err;
                }
                if (!this.options.autoUpdateTokens) {
                    throw err;
                }
                const tokenReq = { refresh_token: this.refreshToken };
                const tokenRes = yield rpc_1.rpc.user.newAccessToken(this.rpcUrl, tokenReq, this.id);
                this.setAccessToken(tokenRes.access_token);
                return yield method(this.rpcUrl, req, this.id);
            }
        });
    }
    setAccessToken(token) {
        this.currentAccessToken = token;
    }
}
exports.AsteroidDomainUser = AsteroidDomainUser;
//# sourceMappingURL=asteroid-domain-user.js.map