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
var claims_helper_1 = require("../helpers/claims-helper");
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
     * return the contract version
     * @param network
     * @param contractHash
     * @returns {Promise<number>}
     */
    NeoContractIdentity.getContractVersion = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getContractVersion';
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
    NeoContractIdentity.getIdentityExists = function (network, contractHash, identityId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getIdentityExists';
                        args = [
                            identityId
                        ];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, _1.NeoCommon.expectBoolean(response)];
                }
            });
        });
    };
    /*
    static async keyExistsForIdentity(network: any, contractHash: any, identityId: any, targetKey: any): Promise<boolean> {
      const operation = 'keyExistsForIdentity'
      const args = [u.str2hexstring(identityId), targetKey]
      const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
      return NeoCommon.expectBoolean(response)
    }
  
    static async addKeyToIdentity(network: any, contractHash: any, identityId: any, targetKey: any, permissionLevel: any, wif: any) {
      const operation = 'addKeyToIdentity'
      const account = new wallet.Account(wif)
  
      const args = [u.str2hexstring(identityId), account.publicKey, targetKey, permissionLevel]
      const response = await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
      return NeoCommon.expectBoolean(response)
    }
  
    static async getKeyPermissionLevel(network: any, contractHash: any, identityId: any, targetKey: any): Promise<number> {
      const operation = 'getKeyPermissionLevel'
      const args = [u.str2hexstring(identityId), targetKey]
      const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
  
      if (response.result.stack.length > 0) {
        if (response.result.stack[0].value !== '') {
          return parseInt(u.reverseHex(response.result.stack[0].value.toString()), 16)
        }
      }
      return 0
    }
  
    static async setKeyPermissionLevel(network: any, contractHash: any, identityId: any, targetKey: any, permissionLevel: any, wif: any): Promise<void> {
      const operation = 'setKeyPermissionLevel'
      const account = new wallet.Account(wif)
  
      const args = [u.str2hexstring(identityId), account.publicKey, targetKey, permissionLevel]
      await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
    }
  
    static async deleteKeyFromIdentity(network: any, contractHash: any, identityId: any, targetKey: any, wif: any): Promise<void> {
      const operation = 'deleteKeyFromIdentity'
      const account = new wallet.Account(wif)
  
      const args = [u.str2hexstring(identityId), account.publicKey, targetKey]
      await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
    }
     */
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
    /**
     * creates a new identity for the user
     * @param network - the network
     * @param contractHash - the contract hash to invoke
     * @param wif - the wif of the user
     */
    NeoContractIdentity.createIdentity = function (network, contractHash, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, rootKey, payload, encryptedPayload, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'createIdentity';
                        account = new neon_js_1.wallet.Account(wif);
                        rootKey = new neon_js_1.wallet.Account();
                        return [4 /*yield*/, claims_helper_1.ClaimsHelper.encryptECIES(account.publicKey, Buffer.from(rootKey.privateKey))];
                    case 1:
                        payload = _a.sent();
                        encryptedPayload = JSON.stringify(payload);
                        args = [
                            account.publicKey,
                            rootKey.publicKey,
                            neon_js_1.u.str2hexstring(encryptedPayload)
                        ];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NeoContractIdentity.getRootPubKey = function (network, contractHash, identityId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getRootPubKey';
                        args = [
                            identityId
                        ];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
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
    NeoContractIdentity.getRootPrivKey = function (network, contractHash, identityId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getRootPrivKey';
                        args = [
                            identityId
                        ];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
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
    NeoContractIdentity.issueProof = function (network, contractHash, identityId, owner, sub, type, payload, encryption, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, issuer, identityPubKey, encryptedPayload, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'issueProof';
                        issuer = new neon_js_1.wallet.Account(wif);
                        if (!(encryption === "owner_eceis")) return [3 /*break*/, 1];
                        identityPubKey = identityId;
                        encryptedPayload = claims_helper_1.ClaimsHelper.encryptECIES(identityPubKey, payload);
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(encryption === "root_eceis")) return [3 /*break*/, 3];
                        return [4 /*yield*/, NeoContractIdentity.getRootPubKey(network, contractHash, identityId)];
                    case 2:
                        identityPubKey = _a.sent();
                        encryptedPayload = claims_helper_1.ClaimsHelper.encryptECIES(identityPubKey, payload);
                        return [3 /*break*/, 4];
                    case 3: throw new Error("invalid encryption method");
                    case 4:
                        encryptedPayload = JSON.stringify(encryptedPayload);
                        args = [
                            identityId,
                            owner,
                            issuer.publicKey,
                            neon_js_1.u.str2hexstring(sub),
                            neon_js_1.u.str2hexstring(type),
                            neon_js_1.u.str2hexstring(encryptedPayload),
                            neon_js_1.wallet.sign(encryptedPayload, issuer.privateKey),
                            neon_js_1.u.str2hexstring(encryption)
                        ];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    static async updateRootKey(network: any, contractHash: any, wif: any): Promise<any> {
      const operation = 'updateRootKey'
      const account = new wallet.Account(wif)
      const rootKey = new wallet.Account()
  
      let payload = ClaimsHelper.encryptECIES(account.publicKey, Buffer.from(rootKey.privateKey))
      let encryptedPayload = JSON.stringify(payload)
  
      const args = [
        account.publicKey,
        rootKey.publicKey,
        u.str2hexstring(encryptedPayload)
      ]
  
      await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
    }
     */
    NeoContractIdentity.getKeyBySubAndType = function (network, contractHash, identityId, sub, type) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getKeyBySubAndType';
                        args = [
                            identityId,
                            neon_js_1.u.str2hexstring(sub),
                            neon_js_1.u.str2hexstring(type)
                        ];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
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
    return NeoContractIdentity;
}());
exports.NeoContractIdentity = NeoContractIdentity;
//# sourceMappingURL=neo-contract-identity.js.map