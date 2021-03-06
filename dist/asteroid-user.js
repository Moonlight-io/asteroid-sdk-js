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
exports.AsteroidUser = void 0;
var lodash_1 = require("lodash");
var node_log_it_1 = require("node-log-it");
var rpc_1 = require("./rpc");
var helpers_1 = require("./helpers");
var rpc_error_codes_1 = require("./constants/rpc-error-codes");
var MODULE_NAME = 'AsteroidUser';
var DEFAULT_OPTIONS = {
    networkType: 'production',
    accessToken: undefined,
    refreshToken: undefined,
    autoUpdateTokens: true,
    id: '0',
    loggerOptions: {},
    vividService: undefined,
};
var AsteroidUser = /** @class */ (function () {
    function AsteroidUser(options) {
        if (options === void 0) { options = {}; }
        // Associate optional properties
        this.options = lodash_1.merge({}, DEFAULT_OPTIONS, options);
        this.validateOptionalParameters();
        // Bootstrapping
        this.setAccessToken(this.options.accessToken);
        this.setRefreshToken(this.options.refreshToken);
        this.logger = new node_log_it_1.Logger(MODULE_NAME, this.options.loggerOptions);
        this.logger.debug('constructor completes.');
    }
    Object.defineProperty(AsteroidUser.prototype, "asteroidDomainUserBaseUrl", {
        get: function () {
            if (this.options.networkType) {
                return helpers_1.NetworkHelper.getAsteroidDomainUserBaseUrl(this.options.networkType);
            }
            throw new Error('Unable to determine baseUrl for AsteroidDomainUser.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AsteroidUser.prototype, "asteroidDomainWorkerBaseUrl", {
        get: function () {
            if (this.options.networkType) {
                return helpers_1.NetworkHelper.getAsteroidDomainWorkerBaseUrl(this.options.networkType);
            }
            throw new Error('Unable to determine baseUrl for AsteroidDomainWorker.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AsteroidUser.prototype, "accessToken", {
        get: function () {
            return this.currentAccessToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AsteroidUser.prototype, "refreshToken", {
        get: function () {
            return this.currentRefreshToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AsteroidUser.prototype, "id", {
        get: function () {
            return this.options.id;
        },
        enumerable: false,
        configurable: true
    });
    AsteroidUser.prototype.setAccessToken = function (token) {
        this.currentAccessToken = token;
    };
    AsteroidUser.prototype.setRefreshToken = function (token) {
        this.currentRefreshToken = token;
    };
    AsteroidUser.prototype.claimTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('claimTask triggered.');
                        req = {
                            access_token: this.accessToken,
                            task_id: taskId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainWorkerBaseUrl, rpc_1.rpc.worker.claimTask, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.createClaim = function (claim) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('createClaim triggered.');
                        req = {
                            access_token: this.accessToken,
                            claim: claim,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.createClaim, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.claim_id];
                }
            });
        });
    };
    AsteroidUser.prototype.createAttributes = function (attributes) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('createAttributes triggered.');
                        req = {
                            access_token: this.accessToken,
                            attributes: attributes,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.createAttributes, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.attributes];
                }
            });
        });
    };
    /**
     * @returns ID of the newly created profile
     */
    AsteroidUser.prototype.createProfile = function (remark, profileType) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('createProfile triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_type: profileType,
                            payload: {
                                remark: remark,
                            },
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.createProfile, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.profile_id];
                }
            });
        });
    };
    AsteroidUser.prototype.createProfilePrivToken = function (profileId, remark, active) {
        if (active === void 0) { active = true; }
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('createProfilePrivToken triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_id: profileId,
                            payload: {
                                remark: remark,
                                active: active,
                            },
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.createProfilePrivToken, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.privilege];
                }
            });
        });
    };
    /**
     * @returns ID of the newly created task
     */
    AsteroidUser.prototype.createTask = function (taskType, taskVersion, taskPriority, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('createTask triggered.');
                        req = {
                            access_token: this.accessToken,
                            task_type: taskType,
                            task_version: taskVersion,
                            task_priority: taskPriority,
                            payload: payload,
                        };
                        return [4 /*yield*/, rpc_1.rpc.worker.createTask(this.asteroidDomainWorkerBaseUrl, req, this.id)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.task_id];
                }
            });
        });
    };
    AsteroidUser.prototype.deleteAttributes = function (attributes) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('deleteAttributes triggered.');
                        req = {
                            access_token: this.accessToken,
                            attributes: attributes,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.deleteAttributes, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.attributes];
                }
            });
        });
    };
    AsteroidUser.prototype.deleteProfile = function (profileId) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('deleteProfile triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_id: profileId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.deleteProfile, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.deleteProfilePriv = function (privilegeId) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('deleteProfilePriv triggered.');
                        req = {
                            access_token: this.accessToken,
                            priv_id: privilegeId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.deleteProfilePriv, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * exchanges a vivid oauth2 code for a profile token
     * @param code the code provided by the authenticated user
     */
    AsteroidUser.prototype.exchangeCode = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('exchangeCode triggered.');
                        req = {
                            access_token: this.accessToken,
                            code: code,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.vividExchangeCode, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.token];
                }
            });
        });
    };
    AsteroidUser.prototype.getActiveTaskIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getActiveTaskIds triggered.');
                        req = {
                            access_token: this.accessToken,
                        };
                        return [4 /*yield*/, rpc_1.rpc.worker.getActiveTaskIds(this.asteroidDomainWorkerBaseUrl, req, this.id)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.task_ids];
                }
            });
        });
    };
    AsteroidUser.prototype.getAttributeHeadersByTypes = function (types) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getAttributeHeadersByTypes triggered.');
                        req = {
                            access_token: this.accessToken,
                            types: types,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getAttributeHeadersByTypes, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.headers];
                }
            });
        });
    };
    AsteroidUser.prototype.getAttributesByIds = function (attributeHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getAttributesByIds triggered.');
                        req = {
                            access_token: this.accessToken,
                            attributes: attributeHeaders,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getAttributesByIds, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.attributes];
                }
            });
        });
    };
    AsteroidUser.prototype.getClaimById = function (claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getClaimById triggered.');
                        req = {
                            access_token: this.accessToken,
                            claim_id: claimId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getClaimById, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.claim];
                }
            });
        });
    };
    AsteroidUser.prototype.getFlatProfileById = function (profileId) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getFlatProfileById triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_id: profileId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getFlatProfileById, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.profile];
                }
            });
        });
    };
    AsteroidUser.prototype.getLatestLogsByTypes = function (types) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getLatestLogsByTypes triggered.');
                        req = {
                            access_token: this.accessToken,
                            types: types,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getLatestLogsByTypes, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.logs];
                }
            });
        });
    };
    AsteroidUser.prototype.getLogHeadersByTypes = function (types, startTimestamp, endTimestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getLogHeadersByTypes triggered.');
                        req = {
                            access_token: this.accessToken,
                            types: types,
                            start_time: startTimestamp,
                            end_time: endTimestamp,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getLogHeadersByTypes, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.headers];
                }
            });
        });
    };
    AsteroidUser.prototype.getLogsByIds = function (logHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getLogsByIds triggered.');
                        req = {
                            access_token: this.accessToken,
                            logs: logHeaders,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getLogsByIds, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.logs];
                }
            });
        });
    };
    AsteroidUser.prototype.getOwnedProfileHeaders = function (profileType) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getOwnedProfileHeaders triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_type: profileType,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getOwnedProfileHeaders, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.profiles];
                }
            });
        });
    };
    AsteroidUser.prototype.getPrivUniqueViews = function (profileId) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getPrivUniqueViews triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_id: profileId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getPrivUniqueViews, req)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUser.prototype.getPrivViews = function (profileId) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getPrivViews triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_id: profileId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getPrivViews, req)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUser.prototype.getPrivViewsSeries = function (profileId) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getPrivViewsSeries triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_id: profileId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getPrivViewsSeries, req)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUser.prototype.getProfileById = function (profileId) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getProfileById triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_id: profileId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getProfileById, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.profile];
                }
            });
        });
    };
    AsteroidUser.prototype.getProfilePrivs = function (profileId) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getProfilePrivs triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_id: profileId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getProfilePrivs, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.privileges];
                }
            });
        });
    };
    AsteroidUser.prototype.getProfileUniqueViews = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getProfileUniqueViews triggered.');
                        req = {
                            access_token: this.accessToken,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getProfileUniqueViews, req)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUser.prototype.getProfileViews = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getProfileViews triggered.');
                        req = {
                            access_token: this.accessToken,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getProfileViews, req)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUser.prototype.getProfileViewsSeries = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getPrivViewsSeries triggered.');
                        req = {
                            access_token: this.accessToken,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getProfileViewsSeries, req)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUser.prototype.getUnclaimedTask = function (taskTypes) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getUnclaimedTask triggered.');
                        req = {
                            access_token: this.accessToken,
                            task_types: taskTypes,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainWorkerBaseUrl, rpc_1.rpc.worker.getUnclaimedTask, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AsteroidUser.prototype.getUserMnemonic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getUserMnemonic triggered.');
                        req = {
                            access_token: this.accessToken,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.getUserMnemonic, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AsteroidUser.prototype.getTaskById = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getTaskById triggered.');
                        req = {
                            access_token: this.accessToken,
                            task_id: taskId,
                        };
                        return [4 /*yield*/, rpc_1.rpc.worker.getTaskById(this.asteroidDomainWorkerBaseUrl, req, this.id)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AsteroidUser.prototype.getTasksByState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('getTaskByState triggered.');
                        req = {
                            access_token: this.accessToken,
                            state: state,
                        };
                        return [4 /*yield*/, rpc_1.rpc.worker.getTasksByState(this.asteroidDomainWorkerBaseUrl, req, this.id)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AsteroidUser.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('logout triggered.');
                        req = {
                            access_token: this.accessToken,
                            refresh_token: this.refreshToken,
                        };
                        return [4 /*yield*/, rpc_1.rpc.user.logout(this.asteroidDomainUserBaseUrl, req, this.id)];
                    case 1:
                        _a.sent();
                        this.setAccessToken('');
                        this.setRefreshToken('');
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.modifyProfileComponents = function (modifyProfileItems) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('modifyProfileComponents triggered.');
                        req = {
                            access_token: this.accessToken,
                            payload: modifyProfileItems,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.modifyProfileComponents, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.components];
                }
            });
        });
    };
    AsteroidUser.prototype.quarantineTask = function (taskId, quarantineReason) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('quarantineTask triggered.');
                        req = {
                            access_token: this.accessToken,
                            task_id: taskId,
                            quarantine_reason: quarantineReason,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainWorkerBaseUrl, rpc_1.rpc.worker.quarantineTask, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.registerWorker = function (accessPoint) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('registerWorker triggered.');
                        req = {
                            access_token: this.accessToken,
                            access_point: accessPoint,
                        };
                        return [4 /*yield*/, rpc_1.rpc.worker.registerWorker(this.asteroidDomainWorkerBaseUrl, req, this.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.reissueClaim = function (claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('reissueClaim triggered');
                        req = {
                            access_token: this.accessToken,
                            claim_id: claimId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.reissueClaim, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.resetTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('resetTask triggered.');
                        req = {
                            access_token: this.accessToken,
                            task_id: taskId,
                        };
                        return [4 /*yield*/, rpc_1.rpc.worker.resetTask(this.asteroidDomainWorkerBaseUrl, req, this.id)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AsteroidUser.prototype.resolveTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('resolveTask triggered.');
                        req = {
                            access_token: this.accessToken,
                            task_id: taskId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainWorkerBaseUrl, rpc_1.rpc.worker.resolveTask, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.sendProfileTokenByEmail = function (privilegeId, targetEmails, message) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('sendProfileTokenByEmail triggered.');
                        req = {
                            access_token: this.accessToken,
                            priv_id: privilegeId,
                            target_emails: targetEmails,
                            message: message,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.sendProfileTokenByEmail, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.setUserGroupByEmail = function (email, group, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('setUserGroupByEmail triggered.');
                        req = {
                            access_token: this.accessToken,
                            secret: secret,
                            email: email,
                            group: group,
                        };
                        return [4 /*yield*/, rpc_1.rpc.user.setUserGroupByEmail(this.asteroidDomainUserBaseUrl, req, this.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.submitWorkflowToken = function (dynamicToken, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('submitWorkflowToken triggered.');
                        req = {
                            dynamic_token: dynamicToken,
                            payload: payload,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.submitWorkflowToken, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.updateAttributes = function (attributes) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('updateAttributes triggered.');
                        req = {
                            access_token: this.accessToken,
                            attributes: attributes,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.updateAttributes, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.attributes];
                }
            });
        });
    };
    AsteroidUser.prototype.updatePasswordJwt = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('updatePasswordJwt triggered.');
                        req = {
                            access_token: this.accessToken,
                            password: password,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.updatePasswordJwt, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.updateProfile = function (profileId, remark) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('updateProfile triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_id: profileId,
                            payload: {
                                remark: remark,
                            },
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.updateProfile, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.updateProfilePriv = function (privilegeId, remark, active) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('updateProfilePriv triggered.');
                        req = {
                            access_token: this.accessToken,
                            priv_id: privilegeId,
                            payload: {
                                remark: remark,
                                active: active,
                            },
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.updateProfilePriv, req)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.unclaimTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('unclaimTask triggered.');
                        req = {
                            access_token: this.accessToken,
                            task_id: taskId,
                        };
                        return [4 /*yield*/, rpc_1.rpc.worker.unclaimTask(this.asteroidDomainWorkerBaseUrl, req, this.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsteroidUser.prototype.vividCreateProfile = function (profileType, appId, serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('vividCreateProfile triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_type: profileType,
                            app_id: appId,
                            service_id: serviceId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.vividCreateProfile, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AsteroidUser.prototype.vividCreateProfilePrivCode = function (profileId, appId, serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('vividCreateProfilePrivCode triggered.');
                        req = {
                            access_token: this.accessToken,
                            profile_id: profileId,
                            app_id: appId,
                            service_id: serviceId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.vividCreateProfilePrivCode, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AsteroidUser.prototype.vividGetAppInformation = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('vividGetAppInformation triggered.');
                        req = {
                            access_token: this.accessToken,
                            app_id: appId,
                        };
                        return [4 /*yield*/, this.invokeOrRefreshToken(this.asteroidDomainUserBaseUrl, rpc_1.rpc.user.vividGetAppInformation, req)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AsteroidUser.prototype.validateOptionalParameters = function () {
        if (!this.options.accessToken) {
            throw new Error("Required 'accessToken' is missing.");
        }
        if (!this.options.refreshToken) {
            throw new Error("Required 'refreshToken' is missing.");
        }
    };
    // TODO: Need better input/output typings
    AsteroidUser.prototype.invokeOrRefreshToken = function (baseUrl, method, req) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1, tokenReq, tokenRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        return [4 /*yield*/, method(baseUrl, req, this.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        // Standard behavior of it is not a Invalid Token error
                        if (err_1.code !== rpc_error_codes_1.rpcErrorCodes.InvalidJwtToken) {
                            throw err_1;
                        }
                        // Determine if need to attempt for refresh token
                        if (!this.options.autoUpdateTokens) {
                            throw err_1;
                        }
                        tokenReq = { refresh_token: this.refreshToken };
                        return [4 /*yield*/, rpc_1.rpc.user.newAccessToken(this.asteroidDomainUserBaseUrl, tokenReq, this.id)];
                    case 3:
                        tokenRes = _a.sent();
                        this.setAccessToken(tokenRes.access_token);
                        req.access_token = this.accessToken;
                        return [4 /*yield*/, method(baseUrl, req, this.id)];
                    case 4: 
                    // Reattempt the original RPC invoke
                    return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AsteroidUser;
}());
exports.AsteroidUser = AsteroidUser;
//# sourceMappingURL=asteroid-user.js.map