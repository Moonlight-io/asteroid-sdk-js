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
exports.NeoContractNameService = void 0;
var neon_js_1 = require("@cityofzion/neon-js");
var _1 = require(".");
var NeoContractNameService = /** @class */ (function () {
    function NeoContractNameService() {
    }
    /**
     * Resolves a domain and subDomain to an on chain entity.
     * @param network  The Neo network target.
     * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here).
     * @param domain  The root domain to target (i.e "moonlight").
     * @param subDomain  The subDomain to target (i.e "claims").
     */
    NeoContractNameService.getAddress = function (network, neoCNSScriptHash, domain, subDomain) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getAddress';
                        args = [neon_js_1.u.str2hexstring(domain), neon_js_1.u.str2hexstring(subDomain)];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, neoCNSScriptHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
                            return [2 /*return*/, neon_js_1.u.hexstring2str(response.result.stack[0].value)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Registers a new root level domain for use in the contract.
     * @param network  The Neo network target.
     * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here).
     * @param domain  The requested root domain.
     * @param wif  The owner's wif.
     */
    NeoContractNameService.registerDomain = function (network, neoCNSScriptHash, domain, wif) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, args, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'registerDomain';
                        account = new neon_js_1.wallet.Account(wif);
                        args = [neon_js_1.u.str2hexstring(domain), account.publicKey];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, neoCNSScriptHash, operation, args, wif)];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, (_a = res.response) === null || _a === void 0 ? void 0 : _a.result];
                }
            });
        });
    };
    /**
     * Transfers a domain to a new owner
     * @param network  The Neo network target.
     * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here)
     * @param domain  The domain being transfered.
     * @param target  The target public key.
     * @param wif  The wif of the owner.
     */
    NeoContractNameService.transferDomain = function (network, neoCNSScriptHash, domain, target, wif) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'transferDomain';
                        args = [neon_js_1.u.str2hexstring(domain), target];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, neoCNSScriptHash, operation, args, wif)];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, (_a = res.response) === null || _a === void 0 ? void 0 : _a.result];
                }
            });
        });
    };
    /**
     * Updates the domain registery
     * @param network  The Neo network target.
     * @param neoCNSScriptHash  The neoCNS script hash. This is relatively static and is published (Here).
     * @param domain  The root level domain to update.
     * @param subDomain  The subdomain to modify.
     * @param address  The new target. This can be a literal address or a script hash.
     * @param wif  The wif of the domain owner.
     */
    NeoContractNameService.upsertSubDomain = function (network, neoCNSScriptHash, domain, subDomain, address, wif) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = 'upsertSubDomain';
                        args = [neon_js_1.u.str2hexstring(domain), neon_js_1.u.str2hexstring(subDomain), neon_js_1.u.str2hexstring(address)];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, neoCNSScriptHash, operation, args, wif)];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, (_a = res.response) === null || _a === void 0 ? void 0 : _a.result];
                }
            });
        });
    };
    return NeoContractNameService;
}());
exports.NeoContractNameService = NeoContractNameService;
//# sourceMappingURL=neo-contract-name-service.js.map