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
exports.NeoContractClaims = void 0;
var neon_js_1 = require("@cityofzion/neon-js");
var _1 = require(".");
var claims_helper_1 = require("../helpers/claims-helper");
var claim_encryption_1 = require("../constants/claim_encryption");
var NeoContractClaims = /** @class */ (function () {
    function NeoContractClaims() {
    }
    /**
     * Builds and creates a claim.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param rawClaim  The raw claim to be issued.
     * @param issuerWif  This issuer's WIF.
     */
    NeoContractClaims.buildAndCreateClaim = function (network, claimsContractHash, rawClaim, issuerWif) {
        var claim = NeoContractClaims.buildClaim(rawClaim, issuerWif);
        var res = NeoContractClaims.createClaim(network, claimsContractHash, claim, issuerWif);
        return res;
    };
    /**
     * Builds a claim payload from a raw claim for submission.
     * @param rawClaim  The raw claim to be issued
     * @param issuerWif  The issuer's WIF
     */
    NeoContractClaims.buildClaim = function (rawClaim, issuerWif) {
        var actIssuer = new neon_js_1.wallet.Account(issuerWif);
        var actSub = new neon_js_1.wallet.Account(rawClaim.sub);
        var claimId = neon_js_1.u.str2hexstring(rawClaim.claim_id);
        if (rawClaim.attestations.length <= 0) {
            throw new Error('attestation list must have length greater than 0');
        }
        var attestationList = [];
        var keys = [];
        // iterate over all attestations attached to the claimData
        for (var _i = 0, _a = rawClaim.attestations; _i < _a.length; _i++) {
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
            claim_topic: neon_js_1.u.str2hexstring(rawClaim.claim_topic),
            expires: rawClaim.expires,
            verification_uri: neon_js_1.u.str2hexstring(rawClaim.verification_uri),
            keys: keys,
        };
    };
    /**
     * Checks is the contract has been deployed.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    NeoContractClaims.deployed = function (network, claimsContractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'deployed';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, [])];
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
     * Issues an on-chain claim against an identity.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimInfo the claim payload built by [[`buildClaim`]].
     * @param wif the claim issuer's WIF.
     */
    NeoContractClaims.createClaim = function (network, claimsContractHash, claimInfo, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'createClaim';
                        args = [claimInfo.formattedAttestations, claimInfo.signed_by, claimInfo.signature, claimInfo.claim_id, claimInfo.sub, claimInfo.claim_topic, claimInfo.expires, claimInfo.verification_uri];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, claimsContractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Creates a new claim topic
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimTopic The name of the claim topic.
     * @param identifiers An array of the different fields within claims that are issued to against this topic.
     * @param wif  The claim topic creator.
     */
    NeoContractClaims.createClaimTopic = function (network, claimsContractHash, claimTopic, identifiers, wif) {
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
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, claimsContractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves a claim by its claim id.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimID The claim id of the claim being requested.
     */
    NeoContractClaims.getClaimByClaimID = function (network, claimsContractHash, claimID) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response, payload, attestations, _i, _a, attestation, expires, claimInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'getClaimByClaimID';
                        args = [neon_js_1.u.str2hexstring(claimID)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
     * Gets a claim by its pointer.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param pointer The pointer to retrieve a claim from.
     */
    NeoContractClaims.getClaimByPointer = function (network, claimsContractHash, pointer) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response, payload, attestations, _i, _a, attestation, expires, claimInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'getClaimByPointer';
                        args = [neon_js_1.u.int2hex(pointer)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
     * Checks if a claim exists.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId The claim id to check the existance of.
     */
    NeoContractClaims.getClaimExists = function (network, claimsContractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimExists';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
     * Checks if the target claim has expired.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId the claim id of the claim to check.
     */
    NeoContractClaims.getClaimHasExpired = function (network, claimsContractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimHasExpired';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
     * Retrieves the issuer of a claim.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId The claim id of the claim to target.
     */
    NeoContractClaims.getClaimIssuer = function (network, claimsContractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimIssuer';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
     * Retrieves the signature of a claim.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId The claim id of the target claim.
     */
    NeoContractClaims.getClaimSignature = function (network, claimsContractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimSignature';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
     * Retrieves the subject of a claim.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId The target claim.
     */
    NeoContractClaims.getClaimSubject = function (network, claimsContractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimSubject';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
     * Retrieves the topic of a claim
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId The target claim.
     */
    NeoContractClaims.getClaimTopic = function (network, claimsContractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimTopic';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
     * Retrieves a claim topic definition by the claim topic.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimTopic The claim topic to retrieve.
     */
    NeoContractClaims.getClaimTopicByTopic = function (network, claimsContractHash, claimTopic) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response, payload, identifiers, _i, _a, identifier, claimTopicInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'getClaimTopicByTopic';
                        args = [neon_js_1.u.str2hexstring(claimTopic)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
    /**
     * Retrieves a claim topic by its pointer.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param pointer The pointer to retrieve.
     */
    NeoContractClaims.getClaimTopicByPointer = function (network, claimsContractHash, pointer) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response, payload, identifiers, _i, _a, identifier, claimTopicInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'getClaimTopicByPointer';
                        args = [neon_js_1.u.int2hex(pointer)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
    /**
     * Retrieves the claim topic write pointer.  This can be used with an iterator and [[`getClaimTopicByPointer`]] to grab all the claim topics.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    NeoContractClaims.getClaimTopicWritePointer = function (network, claimsContractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimTopicWritePointer';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, [])];
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
     * Retrieves the verification URI of a claim
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param claimId  The claim id being targeted.
     */
    NeoContractClaims.getClaimVerificationURI = function (network, claimsContractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimVerificationURI';
                        args = [neon_js_1.u.str2hexstring(claimId)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, args)];
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
     * Retrieves the claim write pointer.  This can be used with [[`getClaimByPointer`]] to iterate over and retrieve all claims.
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    NeoContractClaims.getClaimWritePointer = function (network, claimsContractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimWritePointer';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, [])];
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
     * Gets the contract name
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     */
    NeoContractClaims.getContractName = function (network, claimsContractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getContractName';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, claimsContractHash, operation, [])];
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
     * Registers the contract with the contract name service
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param cnsHash The contract name service script hash.
     * @param wif The issuer WIF.
     */
    NeoContractClaims.registerContractName = function (network, claimsContractHash, cnsHash, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'registerContractName';
                        account = new neon_js_1.wallet.Account(wif);
                        args = [cnsHash, account.publicKey];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, claimsContractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Updates the contract's hash in the contract name service
     * @param network  The Neo network target.
     * @param claimsContractHash  The claims script hash found which can be found by using [[`NeoContractNameService.getAddress`]].
     * @param cnsHash The contract name service script hash.
     * @param wif The issuer's WIF.
     */
    NeoContractClaims.updateContractAddress = function (network, claimsContractHash, cnsHash, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'updateContractAddress';
                        args = [cnsHash];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, claimsContractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return NeoContractClaims;
}());
exports.NeoContractClaims = NeoContractClaims;
//# sourceMappingURL=neo-contract-claims.js.map