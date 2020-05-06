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
var neo_contract_identity_1 = require("./neo-contract-identity");
var neo_contract_claims_1 = require("./neo-contract-claims");
var _1 = require(".");
var neon_js_1 = require("@cityofzion/neon-js");
var helpers_1 = require("../helpers");
var NeoVivid = /** @class */ (function () {
    function NeoVivid() {
    }
    NeoVivid.getDecryptedClaimByClaimID = function (network, neoCNSScriptHash, claimId, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var requestWallet, claimsContractPromise, identityContractPromise, claimsContract, identityContract, claim, promises, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestWallet = new neon_js_1.wallet.Account(wif);
                        claimsContractPromise = _1.NeoContractNameService.getAddress(network, neoCNSScriptHash, 'moonlight', 'claims');
                        identityContractPromise = _1.NeoContractNameService.getAddress(network, neoCNSScriptHash, 'moonlight', 'identity');
                        return [4 /*yield*/, claimsContractPromise];
                    case 1:
                        claimsContract = _b.sent();
                        return [4 /*yield*/, identityContractPromise];
                    case 2:
                        identityContract = _b.sent();
                        if (!claimsContract || !identityContract) {
                            throw new Error('unable to retrieve contract hashes');
                        }
                        return [4 /*yield*/, this.getFormattedClaimByClaimID(network, claimsContract, claimId)];
                    case 3:
                        claim = _b.sent();
                        promises = claim.attestations.map(function (attestation, i) { return __awaiter(_this, void 0, void 0, function () {
                            var key, decryptedKey;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, neo_contract_identity_1.NeoContractIdentity.getKeyByHolderSub(network, identityContract, requestWallet.publicKey, claim.claim_id + ':' + i, 0)];
                                    case 1:
                                        key = _a.sent();
                                        decryptedKey = '';
                                        if (key && key.encryption && key.payload) {
                                            // decrypt the key if required
                                            decryptedKey = helpers_1.Encryption.decryptPayload(key.encryption, key.payload, requestWallet.privateKey);
                                        }
                                        try {
                                            attestation.decryptedValue = helpers_1.Encryption.decryptPayload(attestation.encryption, attestation.value, decryptedKey);
                                        }
                                        catch (_b) {
                                            attestation.decryptedValue = undefined;
                                        }
                                        return [2 /*return*/, attestation];
                                }
                            });
                        }); });
                        _a = claim;
                        return [4 /*yield*/, Promise.all(promises)];
                    case 4:
                        _a.attestations = _b.sent();
                        return [2 /*return*/, claim];
                }
            });
        });
    };
    NeoVivid.getFormattedClaimByClaimID = function (network, claimsScriptHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var claim, claimTopic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, neo_contract_claims_1.NeoContractClaims.getClaimByClaimID(network, claimsScriptHash, claimId)];
                    case 1:
                        claim = _a.sent();
                        if (!claim) {
                            throw new Error('unable to retrieve claim');
                        }
                        return [4 /*yield*/, neo_contract_claims_1.NeoContractClaims.getClaimTopicByTopic(network, claimsScriptHash, claim.claim_topic)];
                    case 2:
                        claimTopic = _a.sent();
                        if (!claimTopic) {
                            throw new Error('unable to retrieve claim topic');
                        }
                        claimTopic.identifiers.forEach(function (identifier, i) {
                            claim.attestations[i].identifier = identifier;
                        });
                        return [2 /*return*/, claim];
                }
            });
        });
    };
    return NeoVivid;
}());
exports.NeoVivid = NeoVivid;
//# sourceMappingURL=neo-vivid.js.map