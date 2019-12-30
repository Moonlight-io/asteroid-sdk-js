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
var _1 = require(".");
var NeoContractClaims = /** @class */ (function () {
    function NeoContractClaims() {
    }
    /**
     * checks if the script is deployed
     * @param network
     * @param contractHash
     * @returns {Promise<any>}
     */
    NeoContractClaims.deployed = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'deployed';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
                    case 1: return [2 /*return*/, _a.sent()];
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
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'claimExists';
                        args = [claimId];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1: return [2 /*return*/, _a.sent()];
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
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'claimHasExpired';
                        args = [claimId];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * creates a new claim on the platform
     * @param network
     * @param api
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
    NeoContractClaims.createClaim = function (network, api, contractHash, attestations, signedBy, signature, claimID, expires, verificationURI, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'createClaim';
                        args = [attestations, signedBy, signature, claimID, expires, verificationURI];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)];
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
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimIssuer';
                        args = [claimId];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1: return [2 /*return*/, _a.sent()];
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
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimSignature';
                        args = [claimId];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1: return [2 /*return*/, _a.sent()];
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
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getClaimVerificationURI';
                        args = [claimId];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1: return [2 /*return*/, _a.sent()];
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
            var operation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getContractName';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * registers the contract against the neo contract name service
     * @param network
     * @param api
     * @param contractHash
     * @param cnsHash
     * @param owner
     * @param wif
     * @returns {Promise<any>}
     */
    NeoContractClaims.registerContractName = function (network, api, contractHash, cnsHash, owner, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'registerContractName';
                        args = [cnsHash, owner];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * updates the contract's address on neo contract name service
     * @param network
     * @param api
     * @param contractHash
     * @param cnsHash
     * @param wif
     * @returns {Promise<any>}
     */
    NeoContractClaims.updateContractAddress = function (network, api, contractHash, cnsHash, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'updateContractAddress';
                        args = [cnsHash];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, api, contractHash, operation, args, wif)];
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
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'attestationIdentifierExists';
                        args = [claimId, attestationIdentifier];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1: return [2 /*return*/, _a.sent()];
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
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'attestationIdentifierMessage';
                        args = [claimId, attestationIdentifier];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1: return [2 /*return*/, _a.sent()];
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
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'attestationIdentifierValue';
                        args = [claimId, attestationIdentifier];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1: return [2 /*return*/, _a.sent()];
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
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'isAttestationValueEncrypted';
                        args = [claimId, attestationIdentifier];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return NeoContractClaims;
}());
exports.NeoContractClaims = NeoContractClaims;
//# sourceMappingURL=neo-contract-claims.js.map