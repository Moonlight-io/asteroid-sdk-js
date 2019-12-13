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
var neon_js_1 = require("@cityofzion/neon-js");
var _1 = require(".");
var NeoIdentityContract = /** @class */ (function () {
    function NeoIdentityContract() {
    }
    /**
     * have the identity contract do a dynamic invoke to the CNS registering itself
     */
    NeoIdentityContract.cnsRegister = function (network, api, contractHash, contractNameService, owner, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'registerContractName';
                        args = [neon_js_1.u.reverseHex(contractNameService), owner];
                        return [4 /*yield*/, _1.NeoBlockchainCommon.contractInvocation(network, api, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Have the identity contract do a dynamic invoke to the CNS updating its scriptHash
     */
    NeoIdentityContract.cnsUpdate = function (network, api, contractHash, contractNameService, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'updateContractAddress';
                        args = [neon_js_1.u.reverseHex(contractNameService), wif];
                        return [4 /*yield*/, _1.NeoBlockchainCommon.contractInvocation(network, api, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Test whether an address is registered with CNS
     */
    NeoIdentityContract.cnsIntegration = function (network, api, contractHash, contractNameService, defaultContact, owner, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var contractName, operation, args, invocation, response, currentAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _1.NeoBlockchainCommon.contractName(network, contractHash)];
                    case 1:
                        contractName = _a.sent();
                        operation = 'GetAddress';
                        args = [neon_js_1.u.str2hexstring(contractName)];
                        invocation = {
                            scriptHash: contractNameService,
                            operation: operation,
                            args: args,
                        };
                        return [4 /*yield*/, _1.NeoBlockchainCommon.scriptInvocation(network, invocation)];
                    case 2:
                        response = _a.sent();
                        if (!(response.result.stack.length > 0 && response.result.stack[0].value !== '')) return [3 /*break*/, 5];
                        currentAddress = neon_js_1.u.reverseHex(response.result.stack[0].value.toString());
                        if (!(currentAddress !== defaultContact)) return [3 /*break*/, 4];
                        // contract address has changed, update it
                        return [4 /*yield*/, NeoIdentityContract.cnsUpdate(network, api, contractHash, contractNameService, wif)];
                    case 3:
                        // contract address has changed, update it
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5: 
                    // address doesn't exist, register it
                    return [4 /*yield*/, NeoIdentityContract.cnsRegister(network, api, contractHash, contractNameService, owner, wif)];
                    case 6:
                        // address doesn't exist, register it
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Test whether `identityId` exists on-chain
     */
    NeoIdentityContract.identityExists = function (network, contractHash, identityId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'identityExists';
                        args = [identityId];
                        return [4 /*yield*/, _1.NeoBlockchainCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, _1.NeoBlockchainCommon.expectBoolean(response)];
                }
            });
        });
    };
    NeoIdentityContract.keyExistsForIdentity = function (network, contractHash, identityId, targetKey) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'keyExistsForIdentity';
                        args = [identityId, targetKey];
                        return [4 /*yield*/, _1.NeoBlockchainCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, _1.NeoBlockchainCommon.expectBoolean(response)];
                }
            });
        });
    };
    NeoIdentityContract.addKeyToIdentity = function (network, api, contractHash, identityId, adminKey, targetKey, permissionLevel, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'addKeyToIdentity';
                        args = [identityId, adminKey, targetKey, permissionLevel];
                        return [4 /*yield*/, _1.NeoBlockchainCommon.contractInvocation(network, api, contractHash, operation, args, wif)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, _1.NeoBlockchainCommon.expectBoolean(response)];
                }
            });
        });
    };
    NeoIdentityContract.getKeyPermissionLevel = function (network, contractHash, identityId, targetKey) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getKeyPermissionLevel';
                        args = [identityId, targetKey];
                        return [4 /*yield*/, _1.NeoBlockchainCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            if (response.result.stack[0].value !== '') {
                                parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value.toString()), 16);
                            }
                        }
                        return [2 /*return*/, 0];
                }
            });
        });
    };
    NeoIdentityContract.setKeyPermissionLevel = function (network, api, contractHash, identityId, adminKey, targetKey, permissionLevel, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'setKeyPermissionLevel';
                        args = [identityId, adminKey, targetKey, permissionLevel];
                        return [4 /*yield*/, _1.NeoBlockchainCommon.contractInvocation(network, api, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NeoIdentityContract.deleteKeyFromIdentity = function (network, api, contractHash, identityId, adminKey, targetKey, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'deleteKeyFromIdentity';
                        args = [identityId, adminKey, targetKey];
                        return [4 /*yield*/, _1.NeoBlockchainCommon.contractInvocation(network, api, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NeoIdentityContract.deleteIdentity = function (network, api, contractHash, identityId, adminKey, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'deleteIdentity';
                        args = [identityId, adminKey];
                        return [4 /*yield*/, _1.NeoBlockchainCommon.contractInvocation(network, api, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NeoIdentityContract.createIdentity = function (network, api, contractHash, identityLabel, keys, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'createIdentity';
                        args = [identityLabel];
                        args = args.concat(keys);
                        return [4 /*yield*/, _1.NeoBlockchainCommon.contractInvocation(network, api, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return NeoIdentityContract;
}());
exports.NeoIdentityContract = NeoIdentityContract;
//# sourceMappingURL=neo-identity-contract.js.map