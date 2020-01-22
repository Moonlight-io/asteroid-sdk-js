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
var NeoContractClaims = /** @class */ (function () {
    function NeoContractClaims() {
    }
    NeoContractClaims.buildClaim = function (claimId, topic, attestations, expires, verificationUri, subject, issuer_wif) {
        var issuer = new neon_js_1.wallet.Account(issuer_wif);
        var sub = new neon_js_1.wallet.Account(subject);
        if (attestations.length <= 0) {
            /* tslint:disable-next-line */
            throw new Error("attestation list must have length greater than 0");
        }
        var attestationList = [];
        // iterate over all attestations attached to the claimData
        for (var _i = 0, attestations_1 = attestations; _i < attestations_1.length; _i++) {
            var attestation = attestations_1[_i];
            var payload = claims_helper_1.ClaimsHelper.formatAttestation(attestation, issuer, sub);
            attestationList.push(payload);
        }
        claimId = neon_js_1.u.str2hexstring(claimId);
        attestationList.push('00' + claims_helper_1.ClaimsHelper.hexLength(claimId) + claimId);
        var attestationBytes = attestationList.join('');
        attestations = 80 + neon_js_1.u.int2hex(attestationList.length) + attestationBytes;
        var contractPayload = {
            attestations: attestations,
            signed_by: issuer.publicKey,
            signature: neon_js_1.wallet.sign(attestations, issuer.privateKey),
            claim_id: claimId,
            sub: sub.publicKey,
            topic: neon_js_1.u.str2hexstring(topic),
            expires: expires,
            verification_uri: neon_js_1.u.str2hexstring(verificationUri),
        };
        return contractPayload;
    };
    /**
     * checks if the script is deployed
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
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
     * creates a new claim on the platform
     * @param network
     * @param contractHash
     * @param attestations
     * @param signedBy
     * @param signature
     * @param claimID
     * @param expires
     * @param verificationURI
     * @param wif
     * @returns {Promise<any>}
     */
    NeoContractClaims.createClaim = function (network, contractHash, attestations, signedBy, signature, claimId, sub, topic, expires, verificationUri, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'createClaim';
                        args = [attestations, signedBy, signature, claimId, sub, topic, expires, verificationUri];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * checks if a claim exists on the platform using claim_id
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
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
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
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
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * gets the claim issuer
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
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
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * gets the target claim's signature
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
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
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * gets the claim subject
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
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
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * gets the claim topic
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
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
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * gets the verificationURI field of the claim
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
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
                        return [2 /*return*/, null];
                }
            });
        });
    };
    // Contract Name Service Helpers
    /**
     * gets the contract name
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
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
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * registers the contract against the neo contract name service
     * @param network
     * @param contractHash
     * @param cnsHash
     * @param wif
     * @returns {Promise<any>}
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
     * @param network
     * @param contractHash
     * @param cnsHash
     * @param wif
     * @returns {Promise<any>}
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
    // Verification domain
    NeoContractClaims.attestationEncryptionMethod = function (network, contractHash, claimId, attestationIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'attestationEncryptionMethod';
                        args = [neon_js_1.u.str2hexstring(claimId), neon_js_1.u.str2hexstring(attestationIdentifier)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, claims_helper_1.ClaimsHelper.encryptionModeStrFromHex(response.result.stack[0].value)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * checks if an attestation identifier exists on a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    NeoContractClaims.attestationIdentifierExists = function (network, contractHash, claimId, attestationIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'attestationIdentifierExists';
                        args = [neon_js_1.u.str2hexstring(claimId), neon_js_1.u.str2hexstring(attestationIdentifier)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, !(response.result.stack[0].value === '' || !response.result.stack[0].value)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * retrieves an attestation remark from a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    NeoContractClaims.attestationIdentifierRemark = function (network, contractHash, claimId, attestationIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'attestationIdentifierRemark';
                        args = [neon_js_1.u.str2hexstring(claimId), neon_js_1.u.str2hexstring(attestationIdentifier)];
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
    /**
     * retrieves an attestation's value from a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    NeoContractClaims.attestationIdentifierValue = function (network, contractHash, claimId, attestationIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'attestationIdentifierValue';
                        args = [neon_js_1.u.str2hexstring(claimId), neon_js_1.u.str2hexstring(attestationIdentifier)];
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
    return NeoContractClaims;
}());
exports.NeoContractClaims = NeoContractClaims;
/*
function formatAttestation(attestation: any): any {

  const valType = typeof attestation.value;
  let fieldValue;

  switch (valType) {
    case 'boolean':
      fieldValue = intToHexWithLengthPrefix(attestation.value ? 1 : 0)
      break;

    case 'number':
      if (isInt(attestation.value)) {
        fieldValue = intToHexWithLengthPrefix(attestation.value)
      } else if (isFloat(attestation.value)) {
        fieldValue = u.num2fixed8(attestation.value)
      } else {
        throw new Error('unknown number type: ' + attestation.value)
      }
      break

    case 'string':
      if (attestation.encryption !== 0) {
        fieldValue = stringToHexWithLengthPrefix(attestation.value)
      } else {
        // encrypted values are already hex encoded
        fieldValue = hexStringWithLengthPrefix(attestation.value)
      }
      break

    default:
      throw new Error(valType + ' unhandled')
  }

  const encryption = intToHexWithLengthPrefix(attestation.encryption)
  const fieldIdentifier = stringToHexWithLengthPrefix(attestation.identifier)
  const fieldRemark = stringToHexWithLengthPrefix(attestation.remark)

  const payload = 80 + u.int2hex(4) + '00' + encryption + '00' + fieldIdentifier + '00' + fieldRemark + '00' + fieldValue

  return payload
}
*/
//# sourceMappingURL=neo-contract-claims.js.map