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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const node_log_it_1 = require("node-log-it");
const rpc_1 = require("./rpc");
const MODULE_NAME = 'AsteroidDomainUser';
const DEFAULT_OPTIONS = {
    network: 'production',
    accessToken: undefined,
    refreshToken: undefined,
    loggerOptions: {},
};
class AsteroidDomainUser {
    constructor(options = {}) {
        this.options = lodash_1.merge({}, DEFAULT_OPTIONS, options);
        this.validateOptionalParameters();
        this.logger = new node_log_it_1.Logger(MODULE_NAME, this.options.loggerOptions);
        this.logger.debug('constructor completes.');
    }
    get rpcUrl() {
        return 'https://stage-user.asteroid.moonlight.io/rpc';
    }
    get accessToken() {
        return 'FOO';
    }
    registerEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('registerEmail triggered.');
            const req = {
                email,
            };
            yield rpc_1.rpc.user.registerEmail(this.rpcUrl, req);
        });
    }
    registerEmailWithSecret(email, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('registerEmailWithSecret triggered.');
            const req = {
                email,
                secret,
            };
            const res = yield rpc_1.rpc.user.registerEmailWithSecret(this.rpcUrl, req);
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
            yield rpc_1.rpc.user.updatePassword(this.rpcUrl, req);
        });
    }
    updatePasswordJwt(password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('updatePasswordJwt triggered.');
            const req = {
                access_token: this.accessToken,
                password,
            };
            yield rpc_1.rpc.user.updatePasswordJwt(this.rpcUrl, req);
        });
    }
    requestPasswordReset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('requestPasswordReset triggered.');
            const req = {
                email,
            };
            yield rpc_1.rpc.user.requestPasswordReset(this.rpcUrl, req);
        });
    }
    validateOptionalParameters() {
    }
}
exports.AsteroidDomainUser = AsteroidDomainUser;
//# sourceMappingURL=asteroid-domain-user.js.map