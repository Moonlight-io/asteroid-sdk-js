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
var NeoContractIdentity = /** @class */ (function () {
    function NeoContractIdentity() {
    }
    /**
     * gets the contract name
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    NeoContractIdentity.getContractName = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getContractName';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.hexstring2str(response.result.stack[0].value)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * have the identity contract do a dynamic invoke to the CNS registering itself
     */
    NeoContractIdentity.cnsRegister = function (network, contractHash, contractNameService, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'registerContractName';
                        account = new neon_js_1.wallet.Account(wif);
                        args = [neon_js_1.u.reverseHex(contractNameService), account.publicKey];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
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
    NeoContractIdentity.cnsUpdate = function (network, contractHash, contractNameService, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'updateContractAddress';
                        args = [neon_js_1.u.reverseHex(contractNameService), wif];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
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
    NeoContractIdentity.cnsIntegration = function (network, contractHash, contractNameService, defaultContact, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var contractName, operation, args, invocation, response, currentAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _1.NeoCommon.contractName(network, contractHash)];
                    case 1:
                        contractName = _a.sent();
                        operation = 'GetAddress';
                        args = [neon_js_1.u.str2hexstring(contractName)];
                        invocation = {
                            scriptHash: contractNameService,
                            operation: operation,
                            args: args,
                        };
                        return [4 /*yield*/, _1.NeoCommon.scriptInvocation(network, invocation)];
                    case 2:
                        response = _a.sent();
                        if (!(response.result.stack.length > 0 && response.result.stack[0].value !== '')) return [3 /*break*/, 5];
                        currentAddress = neon_js_1.u.reverseHex(response.result.stack[0].value.toString());
                        if (!(currentAddress !== defaultContact)) return [3 /*break*/, 4];
                        // contract address has changed, update it
                        return [4 /*yield*/, NeoContractIdentity.cnsUpdate(network, contractHash, contractNameService, wif)];
                    case 3:
                        // contract address has changed, update it
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5: 
                    // address doesn't exist, register it
                    return [4 /*yield*/, NeoContractIdentity.cnsRegister(network, contractHash, contractNameService, wif)];
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
     * return the contract version
     * @param network
     * @param contractHash
     * @returns {Promise<number>}
     */
    NeoContractIdentity.contractVersion = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'ContractVersion';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, response.result.stack[0].value];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Test whether `identityId` exists on-chain
     */
    NeoContractIdentity.identityExists = function (network, contractHash, identityId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'identityExists';
                        args = [neon_js_1.u.str2hexstring(identityId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, _1.NeoCommon.expectBoolean(response)];
                }
            });
        });
    };
    NeoContractIdentity.keyExistsForIdentity = function (network, contractHash, identityId, targetKey) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'keyExistsForIdentity';
                        args = [neon_js_1.u.str2hexstring(identityId), targetKey];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, _1.NeoCommon.expectBoolean(response)];
                }
            });
        });
    };
    NeoContractIdentity.addKeyToIdentity = function (network, contractHash, identityId, targetKey, permissionLevel, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'addKeyToIdentity';
                        account = new neon_js_1.wallet.Account(wif);
                        args = [neon_js_1.u.str2hexstring(identityId), account.publicKey, targetKey, permissionLevel];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, _1.NeoCommon.expectBoolean(response)];
                }
            });
        });
    };
    NeoContractIdentity.getKeyPermissionLevel = function (network, contractHash, identityId, targetKey) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getKeyPermissionLevel';
                        args = [neon_js_1.u.str2hexstring(identityId), targetKey];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            if (response.result.stack[0].value !== '') {
                                return [2 /*return*/, parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value.toString()), 16)];
                            }
                        }
                        return [2 /*return*/, 0];
                }
            });
        });
    };
    NeoContractIdentity.setKeyPermissionLevel = function (network, contractHash, identityId, targetKey, permissionLevel, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'setKeyPermissionLevel';
                        account = new neon_js_1.wallet.Account(wif);
                        args = [neon_js_1.u.str2hexstring(identityId), account.publicKey, targetKey, permissionLevel];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NeoContractIdentity.deleteKeyFromIdentity = function (network, contractHash, identityId, targetKey, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'deleteKeyFromIdentity';
                        account = new neon_js_1.wallet.Account(wif);
                        args = [neon_js_1.u.str2hexstring(identityId), account.publicKey, targetKey];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NeoContractIdentity.deleteIdentity = function (network, contractHash, identityId, adminKey, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'deleteIdentity';
                        args = [neon_js_1.u.str2hexstring(identityId), adminKey];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NeoContractIdentity.createIdentity = function (network, contractHash, identityLabel, wif, secondOwnerPublicKey) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'createIdentity';
                        account = new neon_js_1.wallet.Account(wif);
                        args = [neon_js_1.u.str2hexstring(identityLabel), account.publicKey];
                        if (secondOwnerPublicKey !== undefined) {
                            args.push(secondOwnerPublicKey);
                        }
                        console.log(args);
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return NeoContractIdentity;
}());
exports.NeoContractIdentity = NeoContractIdentity;
//# sourceMappingURL=neo-contract-identity.js.map