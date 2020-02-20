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
/* tslint:disable-next-line */
var neon = require('@cityofzion/neon-js').default;
var _1 = require(".");
var NeoContractLX = /** @class */ (function () {
    function NeoContractLX() {
    }
    NeoContractLX.allowance = function (network, contractHash, address, spender) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'allowance';
                        args = [neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address)), neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(spender))];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    NeoContractLX.approve = function (network, contractHash, spender, amount, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, invokeAccount, args;
            return __generator(this, function (_a) {
                operation = 'transferFrom';
                invokeAccount = new neon_js_1.wallet.Account(wif);
                args = [
                    neon_js_1.u.reverseHex(invokeAccount.address),
                    neon_js_1.u.reverseHex(spender),
                    amount
                ];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    NeoContractLX.addAddress = function (network, contractHash, address, group, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'AddAddress';
                args = [
                    neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address)),
                    group
                ];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    NeoContractLX.balanceOf = function (network, contractHash, address) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'balanceOf';
                        args = [
                            neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address))
                        ];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    NeoContractLX.balanceOfVestedAddress = function (network, contractHash, address) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'BalanceOfVestedAddress';
                        args = [
                            neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address))
                        ];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    NeoContractLX.decimals = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'decimals';
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
    NeoContractLX.enableDEXWhiteListing = function (network, contractHash, value, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'admin';
                args = [
                    neon_js_1.u.str2hexstring('EnableDEXWhiteListing'),
                    value
                ];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    NeoContractLX.contractName = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'name';
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
    NeoContractLX.getGroupUnlockBlock = function (network, contractHash, targetGroup) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'GetGroupUnlockBlock';
                        args = [
                            targetGroup
                        ];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            if (response.result.stack[0].value !== '') {
                                return [2 /*return*/, parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value.toString()), 16)];
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    NeoContractLX.getTokenSaleGroupNumber = function (network, contractHash, address) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'GetGroupNumber';
                        args = [
                            neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address))
                        ];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            if (response.result.stack[0].value !== '') {
                                return [2 /*return*/, parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value.toString()), 16)];
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    NeoContractLX.initSmartContract = function (network, contractHash, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'admin';
                args = [
                    neon_js_1.u.str2hexstring('InitSmartContract')
                ];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    NeoContractLX.isPresaleAllocationLocked = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation;
            return __generator(this, function (_a) {
                operation = 'IsPresaleAllocationLocked';
                return [2 /*return*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
            });
        });
    };
    NeoContractLX.mintTokens = function (network, contractHash, neoAmount, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, _api, account, script, invoke;
            return __generator(this, function (_a) {
                operation = 'mintTokens';
                neon.add.network(network);
                _api = new neon_js_1.api.neoscan.instance(network.name);
                account = new neon_js_1.wallet.Account(wif);
                script = neon.create.script({
                    scriptHash: contractHash,
                    operation: operation,
                    args: [],
                });
                invoke = {
                    api: _api,
                    url: network.extra.rpcServer,
                    account: account,
                    intents: neon_js_1.api.makeIntent({ NEO: neoAmount }, contractHash),
                    script: script,
                };
                neon.doInvoke(invoke);
                return [2 /*return*/];
            });
        });
    };
    NeoContractLX.setGroupUnlockBlock = function (network, contractHash, group, block, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'SetGroupUnlockBlock';
                args = [
                    group,
                    block
                ];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    NeoContractLX.symbol = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'symbol';
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
    NeoContractLX.totalSupply = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'totalSupply';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, contractHash, operation, [])];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    NeoContractLX.transfer = function (network, contractHash, toAddress, amount, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, args;
            return __generator(this, function (_a) {
                operation = 'transfer';
                account = new neon_js_1.wallet.Account(wif);
                args = [
                    neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(account.address)),
                    neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(toAddress)), amount
                ];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    NeoContractLX.transferFrom = function (network, contractHash, fromAddress, toAddress, amount, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, invokeAccount, args;
            return __generator(this, function (_a) {
                operation = 'transferFrom';
                invokeAccount = new neon_js_1.wallet.Account(wif);
                args = [
                    neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(invokeAccount.address)),
                    neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(fromAddress)),
                    neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(toAddress)),
                    amount
                ];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    NeoContractLX.updateAdminAddress = function (network, contractHash, address, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'admin';
                args = [
                    neon_js_1.u.str2hexstring('UpdateAdminAddress'),
                    neon_js_1.u.reverseHex(address)
                ];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    return NeoContractLX;
}());
exports.NeoContractLX = NeoContractLX;
//# sourceMappingURL=neo-contract-lx.js.map