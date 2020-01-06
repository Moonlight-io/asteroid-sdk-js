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
var NeoContractClaims = /** @class */ (function () {
    function NeoContractClaims() {
    }
    NeoContractClaims.buildClaim = function (claim_id, attestations, expires, verification_uri, wif, verbose) {
        if (verbose === void 0) { verbose = false; }
        var account = new neon_js_1.wallet.Account(wif);
        if (attestations.length <= 0) {
            console.log('attestations list size must be > 0');
            return;
        }
        var attestationList = [];
        // iterate over all attestations attached to the claimData
        for (var i = 0; i < attestations.length; i++) {
            var attestation = attestations[i];
            if (attestation.is_encrypted) {
                // value must be encrypted before storing on-chain, sign as issuer
                attestation.value = neon_js_1.wallet.sign(attestation.value, account.privateKey);
            }
            var payload = formatAttestation(attestation, verbose);
            attestationList.push(payload);
        }
        claim_id = neon_js_1.u.str2hexstring(claim_id);
        attestationList.push('00' + hexLength(claim_id) + claim_id);
        var attestationBytes = attestationList.join('');
        attestations = 80 + neon_js_1.u.int2hex(attestationList.length)
            + attestationBytes;
        var contractPayload = {
            attestations: attestations,
            signed_by: account.publicKey,
            signature: neon_js_1.wallet.sign(attestations, account.privateKey),
            claim_id: claim_id,
            expires: expires,
            verification_uri: neon_js_1.u.str2hexstring(verification_uri)
        };
        if (verbose) {
            console.log(attestationList);
            console.log('-'.repeat(120));
            console.log(contractPayload);
        }
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
    //Claims domain
    /**
     * checks if a claim exists on the platform using claim_id
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    NeoContractClaims.claimExists = function (network, contractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'claimExists';
                        args = [
                            neon_js_1.u.str2hexstring(claimId)
                        ];
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
    NeoContractClaims.claimHasExpired = function (network, contractHash, claimId) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'claimHasExpired';
                        args = [
                            neon_js_1.u.str2hexstring(claimId)
                        ];
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
    NeoContractClaims.createClaim = function (network, contractHash, attestations, signed_by, signature, claim_id, expires, verification_uri, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'createClaim';
                        args = [
                            attestations,
                            signed_by,
                            signature,
                            claim_id,
                            expires,
                            verification_uri
                        ];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
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
                        args = [
                            neon_js_1.u.str2hexstring(claimId)
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
    /**
     * gets the target claim's signature
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    NeoContractClaims.getClaimSignature = function (network, contractHash, claim_id) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimSignature';
                        args = [
                            neon_js_1.u.str2hexstring(claim_id)
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
    /**
     * gets the verificationURI field of the claim
     * @param network
     * @param contractHash
     * @param claimId
     * @returns {Promise<any>}
     */
    NeoContractClaims.getClaimVerificationURI = function (network, contractHash, claim_id) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimVerificationURI';
                        args = [
                            neon_js_1.u.str2hexstring(claim_id)
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
    //Contract Name Service Helpers
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
                        args = [
                            cnsHash,
                            account.publicKey
                        ];
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
                        args = [
                            cnsHash
                        ];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Verification domain
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
                        args = [
                            neon_js_1.u.str2hexstring(claimId),
                            neon_js_1.u.str2hexstring(attestationIdentifier)
                        ];
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
     * retrieves an attestation message from a claim
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    NeoContractClaims.attestationIdentifierMessage = function (network, contractHash, claimId, attestationIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'attestationIdentifierMessage';
                        args = [
                            neon_js_1.u.str2hexstring(claimId),
                            neon_js_1.u.str2hexstring(attestationIdentifier)
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
                        args = [
                            neon_js_1.u.str2hexstring(claimId),
                            neon_js_1.u.str2hexstring(attestationIdentifier)
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
    /**
     * checks if the attestation's value is encrypted
     * @param network
     * @param contractHash
     * @param claimId
     * @param attestationIdentifier
     * @returns {Promise<any>}
     */
    NeoContractClaims.isAttestationValueEncrypted = function (network, contractHash, claimId, attestationIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'isAttestationValueEncrypted';
                        args = [
                            neon_js_1.u.str2hexstring(claimId),
                            neon_js_1.u.str2hexstring(attestationIdentifier)
                        ];
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
    return NeoContractClaims;
}());
exports.NeoContractClaims = NeoContractClaims;
function formatAttestation(attestation, verbose) {
    if (verbose === void 0) { verbose = false; }
    if (verbose) {
        console.log('formatAttestation()');
        console.log(attestation);
        console.log(typeof (attestation.value));
    }
    var valType = typeof (attestation.value);
    console.log(valType);
    var fieldValue;
    switch (valType) {
        case 'boolean':
            fieldValue = intToHexWithLengthPrefix(attestation.value ? 1 : 0);
            break;
        case 'number':
            if (isInt(attestation.value)) {
                fieldValue = intToHexWithLengthPrefix(attestation.value);
            }
            else if (isFloat(attestation.value)) {
                fieldValue = neon_js_1.u.num2fixed8(attestation.value);
            }
            else {
                throw new Error('unknown number type: ' + attestation.value);
            }
            break;
        case 'string':
            if (!attestation.is_encrypted) {
                fieldValue = stringToHexWithLengthPrefix(attestation.value);
            }
            else {
                // encrypted values are already hex encoded
                fieldValue = hexStringWithLengthPrefix(attestation.value);
            }
            break;
        default:
            throw new Error(valType + ' unhandled');
    }
    var fieldIsEncrypted = intToHexWithLengthPrefix(attestation.is_encrypted ? 1 : 0);
    var fieldIdentifier = stringToHexWithLengthPrefix(attestation.identifier);
    var fieldRemark = stringToHexWithLengthPrefix(attestation.remark);
    var payload = 80 + neon_js_1.u.int2hex(4)
        + '00' + fieldIsEncrypted
        + '00' + fieldIdentifier
        + '00' + fieldRemark
        + '00' + fieldValue;
    if (verbose) {
        console.log('payload: %s\n%s\n\n', payload, '-'.repeat(120));
    }
    return payload;
}
function intToHexWithLengthPrefix(value) {
    var bytes = neon_js_1.u.int2hex(value);
    var len = neon_js_1.u.int2hex(bytes.length / 2);
    return len + bytes;
}
function hexStringWithLengthPrefix(hexValue) {
    var bytes = neon_js_1.u.hexstring2ab(hexValue);
    var len = neon_js_1.u.int2hex(bytes.length);
    return len + hexValue;
}
function stringToHexWithLengthPrefix(value) {
    var bytes = neon_js_1.u.str2ab(value || "");
    var len = neon_js_1.u.int2hex(bytes.length);
    return len + neon_js_1.u.ab2hexstring(bytes);
}
function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
function hexLength(hexString) {
    var size = hexString.length / 2;
    if (size <= 75) {
        return neon_js_1.u.num2hexstring(size);
    }
    else if (size < 0x100) {
        return neon_js_1.u.num2hexstring(size);
    }
    else if (size < 0x10000) {
        return neon_js_1.u.num2hexstring(size, 2, true);
    }
    else if (size < 0x100000000) {
        return neon_js_1.u.num2hexstring(size, 4, true);
    }
    throw new Error('hexString is too big to use: ' + hexString);
}
//# sourceMappingURL=neo-contract-claims.js.map