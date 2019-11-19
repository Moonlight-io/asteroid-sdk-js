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
const network_helper_1 = require("./helpers/network-helper");
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
        this.currentRefreshToken = this.options.refreshToken;
        this.logger = new node_log_it_1.Logger(MODULE_NAME, this.options.loggerOptions);
        this.logger.debug('constructor completes.');
    }
    get baseUrl() {
        if (this.options.networkConfig) {
            return this.options.networkConfig.asteroidDomainUserBaseUrl;
        }
        if (this.options.networkType) {
            return network_helper_1.NetworkHelper.getAsteroidDomainUserBaseUrl(this.options.networkType);
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
        return this.currentRefreshToken;
    }
    get id() {
        return this.options.id;
    }
    setAccessToken(token) {
        this.currentAccessToken = token;
    }
    setRefreshToken(token) {
        this.currentRefreshToken = token;
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
    loginEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('loginEmail triggered.');
            const req = {
                email,
                password,
            };
            const res = yield rpc_1.rpc.user.loginEmail(this.rpcUrl, req, this.id);
            this.setAccessToken(res.access_token);
            this.setRefreshToken(res.refresh_token);
        });
    }
    loginOauth(provider, oauthPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('loginOauth triggered.');
            const req = {
                provider,
                payload: oauthPayload,
            };
            const res = yield rpc_1.rpc.user.loginOauth(this.rpcUrl, req, this.id);
            this.setAccessToken(res.access_token);
            this.setRefreshToken(res.refresh_token);
        });
    }
    setUserGroupByEmail(email, group) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('setUserGroupByEmail triggered.');
            const req = {
                access_token: this.accessToken,
                email,
                group,
            };
            yield rpc_1.rpc.user.setUserGroupByEmail(this.rpcUrl, req, this.id);
        });
    }
    newAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('newAccessToken triggered.');
            const req = {
                refresh_token: this.refreshToken,
            };
            const res = yield rpc_1.rpc.user.newAccessToken(this.rpcUrl, req, this.id);
            this.setAccessToken(res.access_token);
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('logout triggered.');
            const req = {
                access_token: this.accessToken,
                refresh_token: this.refreshToken,
            };
            yield rpc_1.rpc.user.logout(this.rpcUrl, req, this.id);
            this.setAccessToken('');
            this.setRefreshToken('');
        });
    }
    createAttributes(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('createAttributes triggered.');
            const req = {
                access_token: this.accessToken,
                attributes,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.createAttributes, req);
            return res.attributes;
        });
    }
    updateAttributes(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('updateAttributes triggered.');
            const req = {
                access_token: this.accessToken,
                attributes,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.updateAttributes, req);
            return res.attributes;
        });
    }
    deleteAttributes(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('deleteAttributes triggered.');
            const req = {
                access_token: this.accessToken,
                attributes,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.deleteAttributes, req);
            return res.attributes;
        });
    }
    getAttributeHeadersByTypes(types) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getAttributeHeadersByTypes triggered.');
            const req = {
                access_token: this.accessToken,
                types,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.getAttributeHeadersByTypes, req);
            return res.headers;
        });
    }
    getAttributesByIds(attributeHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getAttributesByIds triggered.');
            const req = {
                access_token: this.accessToken,
                attributes: attributeHeaders,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.getAttributesByIds, req);
            return res.attributes;
        });
    }
    createProfile(remark) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('createProfile triggered.');
            const req = {
                access_token: this.accessToken,
                payload: {
                    remark,
                },
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.createProfile, req);
            return res.profile_id;
        });
    }
    deleteProfile(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('deleteProfile triggered.');
            const req = {
                access_token: this.accessToken,
                profile_id: profileId,
            };
            yield this.invokeOrRefreshToken(rpc_1.rpc.user.deleteProfile, req);
        });
    }
    getOwnedProfileHeaders() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getOwnedProfileHeaders triggered.');
            const req = {
                access_token: this.accessToken,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.getOwnedProfileHeaders, req);
            return res.profiles;
        });
    }
    modifyProfileComponents(modifyProfileItems) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('modifyProfileComponents triggered.');
            const req = {
                access_token: this.accessToken,
                payload: modifyProfileItems,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.modifyProfileComponents, req);
            return res.components;
        });
    }
    getProfileById(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getProfileById triggered.');
            const req = {
                access_token: this.accessToken,
                profile_id: profileId,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.getProfileById, req);
            return res.profile;
        });
    }
    getFlatProfileById(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getFlatProfileById triggered.');
            const req = {
                access_token: this.accessToken,
                profile_id: profileId,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.getFlatProfileById, req);
            return res.profile;
        });
    }
    updateProfile(profileId, remark) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('updateProfile triggered.');
            const req = {
                access_token: this.accessToken,
                profile_id: profileId,
                payload: {
                    remark,
                },
            };
            yield this.invokeOrRefreshToken(rpc_1.rpc.user.updateProfile, req);
        });
    }
    getProfileByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getProfileByToken triggered.');
            const req = {
                dynamic_token: token,
            };
            const res = yield rpc_1.rpc.user.getProfileByToken(this.rpcUrl, req, this.id);
            return res.profile;
        });
    }
    createProfilePrivToken(profileId, remark, active = true) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('createProfilePrivToken triggered.');
            const req = {
                access_token: this.accessToken,
                profile_id: profileId,
                payload: {
                    remark,
                    active,
                },
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.createProfilePrivToken, req);
            return res.privilege;
        });
    }
    getProfilePrivs(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getProfilePrivs triggered.');
            const req = {
                access_token: this.accessToken,
                profile_id: profileId,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.getProfilePrivs, req);
            return res.privileges;
        });
    }
    updateProfilePriv(privilegeId, remark, active) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('updateProfilePriv triggered.');
            const req = {
                access_token: this.accessToken,
                priv_id: privilegeId,
                payload: {
                    remark,
                    active,
                },
            };
            yield this.invokeOrRefreshToken(rpc_1.rpc.user.updateProfilePriv, req);
        });
    }
    deleteProfilePriv(privilegeId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('deleteProfilePriv triggered.');
            const req = {
                access_token: this.accessToken,
                priv_id: privilegeId,
            };
            yield this.invokeOrRefreshToken(rpc_1.rpc.user.deleteProfilePriv, req);
        });
    }
    sendProfileTokenByEmail(privilegeId, targetEmails, message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('sendProfileTokenByEmail triggered.');
            const req = {
                access_token: this.accessToken,
                priv_id: privilegeId,
                target_emails: targetEmails,
                message,
            };
            yield this.invokeOrRefreshToken(rpc_1.rpc.user.sendProfileTokenByEmail, req);
        });
    }
    getLogHeadersByTypes(types, startTimestamp, endTimestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getLogHeadersByTypes triggered.');
            const req = {
                access_token: this.accessToken,
                types,
                start_time: startTimestamp,
                end_time: endTimestamp,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.getLogHeadersByTypes, req);
            return res.headers;
        });
    }
    getLogsByIds(logHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getLogsByIds triggered.');
            const req = {
                access_token: this.accessToken,
                logs: logHeaders,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.getLogsByIds, req);
            return res.logs;
        });
    }
    getLatestLogsByTypes(types) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getLatestLogsByTypes triggered.');
            const req = {
                access_token: this.accessToken,
                types,
            };
            const res = yield this.invokeOrRefreshToken(rpc_1.rpc.user.getLatestLogsByTypes, req);
            return res.logs;
        });
    }
    submitWorkflowToken(dynamicToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('submitWorkflowToken triggered.');
            const req = {
                access_token: this.accessToken,
                dynamic_token: dynamicToken,
            };
            yield this.invokeOrRefreshToken(rpc_1.rpc.user.submitWorkflowToken, req);
        });
    }
    createClaim(claim) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('createClaim triggered.');
            const req = {
                access_token: this.accessToken,
                claim,
            };
            yield this.invokeOrRefreshToken(rpc_1.rpc.user.createClaim, req);
        });
    }
    validateOptionalParameters() {
        if (!this.options.networkType && !this.options.networkConfig) {
            throw new Error(`Require to provide either 'networkType' or 'networkConfig'.`);
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
}
exports.AsteroidDomainUser = AsteroidDomainUser;
//# sourceMappingURL=asteroid-domain-user.js.map