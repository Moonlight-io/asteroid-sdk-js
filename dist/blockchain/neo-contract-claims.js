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
var claim_encryption_1 = require("../constants/claim_encryption");
var NeoContractClaims = /** @class */ (function () {
    function NeoContractClaims() {
    }
    NeoContractClaims.buildAndCreateClaim = function (network, contractHash, rawClaim, issuerWif) {
        var claim = NeoContractClaims.buildClaim(rawClaim, issuerWif);
        return NeoContractClaims.createClaim(network, contractHash, claim, issuerWif);
    };
    NeoContractClaims.buildClaim = function (claimInfo, issuerWif) {
        var actIssuer = new neon_js_1.wallet.Account(issuerWif);
        var actSub = new neon_js_1.wallet.Account(claimInfo.sub);
        var claimId = neon_js_1.u.str2hexstring(claimInfo.claim_id);
        if (claimInfo.attestations.length <= 0) {
            throw new Error('attestation list must have length greater than 0');
        }
        var attestationList = [];
        var keys = [];
        // iterate over all attestations attached to the claimData
        for (var _i = 0, _a = claimInfo.attestations; _i < _a.length; _i++) {
            var attestation = _a[_i];
            var secureAtt = claims_helper_1.ClaimsHelper.formatAttestation(attestation, actIssuer, actSub);
            attestationList.push(secureAtt.value);
            keys.push({
                identifier: attestation.identifier,
                key: secureAtt.key,
            });
        }
        var formattedAttestations = 80 + neon_js_1.u.int2hex(attestationList.length) + attestationList.join('');
        return {
            formattedAttestations: formattedAttestations,
            signed_by: actIssuer.publicKey,
            signature: neon_js_1.wallet.sign(formattedAttestations, actIssuer.privateKey),
            claim_id: claimId,
            sub: actSub.publicKey,
            claim_topic: neon_js_1.u.str2hexstring(claimInfo.claim_topic),
            expires: claimInfo.expires,
            verification_uri: neon_js_1.u.str2hexstring(claimInfo.verification_uri),
            keys: keys,
        };
    };
    /**
     * checks if the script is deployed
     */
    NeoContractClaims.deployed = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'deployed';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, !(response.result.stack[0].value === '' || !response.result.stack[0].value)];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    // Claims domain
    /**
     * invokes the createClaim method to publish a new claim on the blockchain
     */
    NeoContractClaims.createClaim = function (network, contractHash, claimInfo, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'createClaim';
                        args = [claimInfo.formattedAttestations, claimInfo.signed_by, claimInfo.signature, claimInfo.claim_id, claimInfo.sub, claimInfo.claim_topic, claimInfo.expires, claimInfo.verification_uri];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NeoContractClaims.createClaimTopic = function (network, contractHash, claimTopic, identifiers, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, issuer, hexIdentifiers, _i, identifiers_1, identifier, identifiersBytes, formattedIdentifiers, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'createClaimTopic';
                        issuer = new neon_js_1.wallet.Account(wif);
                        hexIdentifiers = [];
                        for (_i = 0, identifiers_1 = identifiers; _i < identifiers_1.length; _i++) {
                            identifier = identifiers_1[_i];
                            hexIdentifiers.push('00' + claims_helper_1.ClaimsHelper.stringToHexWithLengthPrefix(identifier));
                        }
                        identifiersBytes = hexIdentifiers.join('');
                        formattedIdentifiers = 80 + neon_js_1.u.int2hex(hexIdentifiers.length) + identifiersBytes;
                        args = [issuer.publicKey, neon_js_1.u.str2hexstring(claimTopic), formattedIdentifiers];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NeoContractClaims.getClaimByClaimID = function (network, contractHash, claimID) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response, payload, attestations, _i, _a, attestation, expires, claimInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'getClaimByClaimID';
                        args = [neon_js_1.u.str2hexstring(claimID)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _b.sent();
                        if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
                            payload = response.result.stack[0].value;
                            attestations = [];
                            for (_i = 0, _a = payload[1].value; _i < _a.length; _i++) {
                                attestation = _a[_i];
                                attestations.push({
                                    remark: neon_js_1.u.hexstring2str(attestation.value[0].value),
                                    value: neon_js_1.u.hexstring2str(attestation.value[1].value),
                                    encryption: claim_encryption_1.inverseClaimEncryptionModes[parseInt(neon_js_1.u.reverseHex(attestation.value[2].value), 16)],
                                });
                            }
                            expires = !payload[6].value ? undefined : parseInt(payload[6].value, 10);
                            claimInfo = {
                                claim_id: neon_js_1.u.hexstring2str(payload[0].value),
                                attestations: attestations,
                                signed_by: payload[2].value,
                                signature: payload[3].value,
                                sub: payload[4].value,
                                claim_topic: neon_js_1.u.hexstring2str(payload[5].value),
                                expires: expires,
                                verification_uri: neon_js_1.u.hexstring2str(payload[7].value),
                            };
                            return [2 /*return*/, claimInfo];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    NeoContractClaims.getClaimByPointer = function (network, contractHash, pointer) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response, payload, attestations, _i, _a, attestation, expires, claimInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'getClaimByPointer';
                        args = [neon_js_1.u.int2hex(pointer)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _b.sent();
                        if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
                            payload = response.result.stack[0].value;
                            attestations = [];
                            for (_i = 0, _a = payload[1].value; _i < _a.length; _i++) {
                                attestation = _a[_i];
                                attestations.push({
                                    remark: neon_js_1.u.hexstring2str(attestation.value[0].value),
                                    value: neon_js_1.u.hexstring2str(attestation.value[1].value),
                                    encryption: claim_encryption_1.inverseClaimEncryptionModes[parseInt(neon_js_1.u.reverseHex(attestation.value[2].value), 16)],
                                });
                            }
                            expires = !payload[6].value ? undefined : parseInt(payload[6].value, 10);
                            claimInfo = {
                                claim_id: neon_js_1.u.hexstring2str(payload[0].value),
                                attestations: attestations,
                                signed_by: payload[2].value,
                                signature: payload[3].value,
                                sub: payload[4].value,
                                claim_topic: neon_js_1.u.hexstring2str(payload[5].value),
                                expires: expires,
                                verification_uri: neon_js_1.u.hexstring2str(payload[7].value),
                            };
                            return [2 /*return*/, claimInfo];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * checks if a claim exists on the platform using claim_id
     */
    NeoContractClaims.getClaimExists = function (network, contractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimExists';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, !(response.result.stack[0].value === '' || !response.result.stack[0].value)];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * checks if the target claim is expired
     */
    NeoContractClaims.getClaimHasExpired = function (network, contractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimHasExpired';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, !(response.result.stack[0].value === '' || !response.result.stack[0].value)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * gets the claim issuer
     */
    NeoContractClaims.getClaimIssuer = function (network, contractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimIssuer';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, response.result.stack[0].value];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * gets the target claim's signature
     */
    NeoContractClaims.getClaimSignature = function (network, contractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimSignature';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, response.result.stack[0].value];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * gets the claim subject
     */
    NeoContractClaims.getClaimSubject = function (network, contractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimSubject';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, response.result.stack[0].value];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * gets the claim topic
     */
    NeoContractClaims.getClaimTopic = function (network, contractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimTopic';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.hexstring2str(response.result.stack[0].value)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    NeoContractClaims.getClaimTopicByTopic = function (network, contractHash, claimTopic) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response, payload, identifiers, _i, _a, identifier, claimTopicInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'getClaimTopicByTopic';
                        args = [neon_js_1.u.str2hexstring(claimTopic)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _b.sent();
                        if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
                            payload = response.result.stack[0].value;
                            identifiers = [];
                            for (_i = 0, _a = payload[1].value; _i < _a.length; _i++) {
                                identifier = _a[_i];
                                identifiers.push(neon_js_1.u.hexstring2str(identifier.value));
                            }
                            claimTopicInfo = {
                                claim_topic: neon_js_1.u.hexstring2str(payload[0].value),
                                identifiers: identifiers,
                                issuer: payload[2].value,
                            };
                            return [2 /*return*/, claimTopicInfo];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    NeoContractClaims.getClaimTopicByPointer = function (network, contractHash, pointer) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response, payload, identifiers, _i, _a, identifier, claimTopicInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'getClaimTopicByPointer';
                        args = [neon_js_1.u.int2hex(pointer)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _b.sent();
                        if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
                            payload = response.result.stack[0].value;
                            identifiers = [];
                            for (_i = 0, _a = payload[1].value; _i < _a.length; _i++) {
                                identifier = _a[_i];
                                identifiers.push(neon_js_1.u.hexstring2str(identifier.value));
                            }
                            claimTopicInfo = {
                                claim_topic: neon_js_1.u.hexstring2str(payload[0].value),
                                identifiers: identifiers,
                                issuer: payload[2].value,
                            };
                            return [2 /*return*/, claimTopicInfo];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    NeoContractClaims.getClaimTopicWritePointer = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimTopicWritePointer';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value), 16)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * gets the verificationURI field of the claim
     */
    NeoContractClaims.getClaimVerificationURI = function (network, contractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimVerificationURI';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.hexstring2str(response.result.stack[0].value)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    NeoContractClaims.getClaimWritePointer = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimWritePointer';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value), 16)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    // Contract Name Service Helpers
    /**
     * gets the contract name
     */
    NeoContractClaims.getContractName = function (network, contractHash) {
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
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * registers the contract against the neo contract name service
     */
    NeoContractClaims.registerContractName = function (network, contractHash, cnsHash, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'registerContractName';
                        account = new neon_js_1.wallet.Account(wif);
                        args = [cnsHash, account.publicKey];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * updates the contract's address on neo contract name service
     */
    NeoContractClaims.updateContractAddress = function (network, contractHash, cnsHash, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'updateContractAddress';
                        args = [cnsHash];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return NeoContractClaims;
}());
exports.NeoContractClaims = NeoContractClaims;
//# sourceMappingURL=neo-contract-claims.js.map