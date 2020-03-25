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
var base_1 = require("./base");
var rpc_defaults_1 = require("../constants/rpc-defaults");
var helpers_1 = require("../helpers");
var AsteroidUserRpc = /** @class */ (function () {
    function AsteroidUserRpc() {
    }
    // #region Register
    AsteroidUserRpc.registerEmail = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.RegisterEmail';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.registerEmailWithSecret = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.RegisterEmailWithSecret';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.registerInterest = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.RegisterInterest';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.setDisableRegistration = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.SetDisableRegistration';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.updatePassword = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.UpdatePassword';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.updatePasswordJwt = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.UpdatePasswordJWT';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.requestPasswordReset = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.RequestPasswordReset';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // #endregion
    // #region Authenticate
    AsteroidUserRpc.loginEmail = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.LoginEmail';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.loginOauth = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.LoginOauth';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.setUserGroupByEmail = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.SetUserGroupByEmail';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.newAccessToken = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.NewAccessToken';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.logout = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.Logout';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.setUserTermsApproval = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.SetUserTermsApproval';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // #endregion
    // #region Attributes
    AsteroidUserRpc.createAttributes = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.CreateAttributes';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.updateAttributes = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.UpdateAttributes';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.deleteAttributes = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.DeleteAttributes';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.getAttributeHeadersByTypes = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetAttributeHeadersByTypes';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.getAttributesByIds = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetAttributesByIDs';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // #endregion
    // #region Profiles
    AsteroidUserRpc.createProfile = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.CreateProfile';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.deleteProfile = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.DeleteProfile';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.getOwnedProfileHeaders = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetOwnedProfileHeaders';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.modifyProfileComponents = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.ModifyProfileComponents';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.getProfileById = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetProfileByID';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.getFlatProfileById = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetFlatProfileByID';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.updateProfile = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.UpdateProfile';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.getProfileByToken = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetProfileByToken';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // #endregion
    // #region Profile Privileges
    AsteroidUserRpc.createProfilePrivToken = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.CreateProfilePrivToken';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.getProfilePrivs = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetProfilePrivs';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.updateProfilePriv = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.UpdateProfilePriv';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.deleteProfilePriv = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.DeleteProfilePriv';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.sendProfileTokenByEmail = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.SendProfileTokenByEmail';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // #endregion
    // #region Logs
    AsteroidUserRpc.getLogHeadersByTypes = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetLogHeadersByTypes';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.getLogsByIds = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetLogsByIDs';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.getLatestLogsByTypes = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetLatestLogsByTypes';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // #endregion
    // #region Claims
    AsteroidUserRpc.createClaim = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.CreateClaim';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.getClaimById = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.GetClaimByID';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsteroidUserRpc.submitWorkflowToken = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'User.SubmitWorkflowToken';
                        return [4 /*yield*/, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AsteroidUserRpc;
}());
exports.AsteroidUserRpc = AsteroidUserRpc;
//# sourceMappingURL=user.js.map