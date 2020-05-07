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
var helpers_1 = require("../helpers");
var identity_helper_1 = require("../helpers/identity-helper");
var NeoContractIdentity = /** @class */ (function () {
    function NeoContractIdentity() {
    }
    // #region RootKey
    /**
     * creates a new root key for the user.  This can be used to issue group and delegated access rights without giving away
     * identity ownership.
     * @param network - the network
     * @param contractHash - the contract hash to invoke
     * @param wif - the wif of the user
     */
    NeoContractIdentity.createRootKey = function (network, contractHash, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, rootKey, securePayload, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'createRootKey';
                        account = new neon_js_1.wallet.Account(wif);
                        rootKey = new neon_js_1.wallet.Account();
                        securePayload = helpers_1.Encryption.encryptPayload('holder_ecies', rootKey.privateKey, account.publicKey);
                        args = [account.publicKey, rootKey.publicKey, helpers_1.ClaimsHelper.fieldToHexString(securePayload.value)];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * attempts to get the root key pair for an identity
     */
    NeoContractIdentity.getRootKeyByIdentity = function (network, contractHash, sub) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getRootKeyByIdentity';
                        args = [sub];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
                            res = {
                                sub: response.result.stack[0].value[0].value,
                                rootPublicKey: response.result.stack[0].value[1].value,
                                rootPrivateKey: neon_js_1.u.hexstring2str(response.result.stack[0].value[2].value),
                            };
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * attempts to get a root key pair using a pointer
     */
    NeoContractIdentity.getRootKeyByPointer = function (network, contractHash, pointer) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getRootKeyByPointer';
                        args = [pointer];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
                            res = {
                                sub: response.result.stack[0].value[0].value,
                                rootPublicKey: response.result.stack[0].value[1].value,
                                rootPrivateKey: neon_js_1.u.hexstring2str(response.result.stack[0].value[2].value),
                            };
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * gets the write head for root keys
     */
    NeoContractIdentity.getRootKeyWritePointer = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getRootKeyWritePointer';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value), 16)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Test whether `sub` exists on-chain and has a root key
     */
    NeoContractIdentity.getIdentityExists = function (network, contractHash, sub) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getIdentityExists';
                        args = [sub];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, _1.NeoCommon.expectBoolean(response)];
                }
            });
        });
    };
    // #endregion
    // #region Keychain
    /**
     * issues a new key to an identity's keychain
     */
    NeoContractIdentity.issueKey = function (network, contractHash, holder, owner, sub, type, payload, encryption, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, issuer, identityPubKey, rootKeys, securePayload, value, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'issueKey';
                        issuer = new neon_js_1.wallet.Account(wif);
                        if (!(encryption === 'holder_ecies')) return [3 /*break*/, 1];
                        identityPubKey = holder;
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(encryption === 'root_ecies')) return [3 /*break*/, 3];
                        return [4 /*yield*/, NeoContractIdentity.getRootKeyByIdentity(network, contractHash, holder)];
                    case 2:
                        rootKeys = _a.sent();
                        if (rootKeys == null) {
                            throw new Error('unable to determine root key: verify the holder has a registered root key');
                        }
                        identityPubKey = rootKeys.rootPublicKey;
                        return [3 /*break*/, 4];
                    case 3: throw new Error('invalid encryption method');
                    case 4:
                        securePayload = helpers_1.Encryption.encryptPayload(encryption, payload.toString(), identityPubKey);
                        value = helpers_1.ClaimsHelper.fieldToHexString(securePayload.value);
                        args = [holder, owner, issuer.publicKey, neon_js_1.u.str2hexstring(sub), neon_js_1.u.str2hexstring(type), value, neon_js_1.wallet.sign(value, issuer.privateKey), neon_js_1.u.str2hexstring(encryption)];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 2)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * attempts to remove a key from an identity's keychain
     * @param network
     * @param contractHash
     * @param pointer
     * @param wif
     */
    NeoContractIdentity.revokeKeyByPointer = function (network, contractHash, pointer, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, requestor, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'revokeKeyByPointer';
                        requestor = new neon_js_1.wallet.Account(wif);
                        args = [pointer, requestor.publicKey];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * gets the key at a specific write pointer
     * @param network
     * @param contractHash
     * @param pointer
     */
    NeoContractIdentity.getKeyByPointer = function (network, contractHash, pointer) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getKeyByPointer';
                        args = [pointer];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, identity_helper_1.IdentityHelper.parseKey(response)];
                }
            });
        });
    };
    /**
     * gets the write pointer for the keychain
     * @param network
     * @param contractHash
     */
    NeoContractIdentity.getKeychainWritePointer = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getKeychainWritePointer';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value), 16)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * gets the key pointers for the holder
     * @param network
     * @param contractHash
     * @param holder
     * @param pointer
     */
    NeoContractIdentity.getKeyByHolder = function (network, contractHash, holder, pointer) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getKeyByHolder';
                        args = [holder, pointer];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, identity_helper_1.IdentityHelper.parseKey(response)];
                }
            });
        });
    };
    /**
     * gets the key pointers for the owner
     * @param network
     * @param contractHash
     * @param owner
     * @param pointer
     */
    /*
    static async getKeyByOwner(network: NetworkItem, contractHash: string, owner: string, pointer: number): Promise<number | null> {
      const operation = 'getKeyByOwner'
      const args = [owner, pointer]
      const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
      return NeoContractIdentity.parseKey(response)
    }
     */
    /**
     * gets the key pointers for the issuer
     * @param network
     * @param contractHash
     * @param issuer
     * @param pointer
     */
    NeoContractIdentity.getKeyByIssuer = function (network, contractHash, issuer, pointer) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getKeyByIssuer';
                        args = [issuer, pointer];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, identity_helper_1.IdentityHelper.parseKey(response)];
                }
            });
        });
    };
    /**
     * gets the key pointers for the holder with a specific subject
     * @param network
     * @param contractHash
     * @param holder
     * @param sub
     * @param pointer
     */
    NeoContractIdentity.getKeyByHolderSub = function (network, contractHash, holder, sub, pointer) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getKeyByHolderSub';
                        args = [holder, neon_js_1.u.str2hexstring(sub), pointer];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, identity_helper_1.IdentityHelper.parseKey(response)];
                }
            });
        });
    };
    return NeoContractIdentity;
}());
exports.NeoContractIdentity = NeoContractIdentity;
//# sourceMappingURL=neo-contract-identity.js.map