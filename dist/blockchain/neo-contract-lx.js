"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.NeoContractLX = void 0;
var neon_js_1 = __importStar(require("@cityofzion/neon-js"));
var _1 = require(".");
var NeoContractLX = /** @class */ (function () {
    function NeoContractLX() {
    }
    /**
     * Gets the transferFrom allowance of an address
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The base address to get the allowance against.
     * @param spender  The address who can spend from "address".
     */
    NeoContractLX.allowance = function (network, lxContractHash, address, spender) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'allowance';
                        args = [neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address)), neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(spender))];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, lxContractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Approve an amount to transfer on behalf of an address.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param spender  The address to grant a transfer allowance.
     * @param amount  The number of tokens to grant spender control over.
     * @param wif  The wif of the base account being spent from.
     */
    NeoContractLX.approve = function (network, lxContractHash, spender, amount, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, invokeAccount, args;
            return __generator(this, function (_a) {
                operation = 'transferFrom';
                invokeAccount = new neon_js_1.wallet.Account(wif);
                args = [neon_js_1.u.reverseHex(invokeAccount.address), neon_js_1.u.reverseHex(spender), amount];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    /**
     * Adds an address to a token sale group.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The address to add.
     * @param group  The group number.
     * @param wif  The contract admin WIF.
     */
    NeoContractLX.addAddress = function (network, lxContractHash, address, group, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'AddAddress';
                args = [neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address)), group];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    /**
     * Returns the token balance of an address
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The requested address to return the balance of.
     */
    NeoContractLX.balanceOf = function (network, lxContractHash, address) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'balanceOf';
                        args = [neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address))];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, lxContractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     *  Gets the amount of tokens on an account that are part of a vesting workflow.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The requested address to return the balance of.
     */
    NeoContractLX.balanceOfVestedAddress = function (network, lxContractHash, address) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'BalanceOfVestedAddress';
                        args = [neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address))];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, lxContractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Returns the number of decimals used on token amounts.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     */
    NeoContractLX.decimals = function (network, lxContractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'decimals';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, lxContractHash, operation, [])];
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
     * Enables Whitelisting of addresses for the transferFrom method.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param value  A value representing whether this feature is enabled or disabled.
     * @param wif  The contract admin wif.
     */
    NeoContractLX.enableDEXWhiteListing = function (network, lxContractHash, value, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'admin';
                args = [neon_js_1.u.str2hexstring('EnableDEXWhiteListing'), value];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    /**
     * Returns the contract's name.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     */
    NeoContractLX.contractName = function (network, lxContractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'name';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, lxContractHash, operation, [])];
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
     * Gets the unlock block for a token sale for a specific group.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param targetGroup  The target group.
     */
    NeoContractLX.getGroupUnlockBlock = function (network, lxContractHash, targetGroup) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'GetGroupUnlockBlock';
                        args = [targetGroup];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, lxContractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            if (response.result.stack[0].value !== '') {
                                return [2 /*return*/, parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value.toString()), 16)];
                            }
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Gets the token sale group number of an address.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The target address to request information about.
     */
    NeoContractLX.getTokenSaleGroupNumber = function (network, lxContractHash, address) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'GetGroupNumber';
                        args = [neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address))];
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, lxContractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            if (response.result.stack[0].value !== '') {
                                return [2 /*return*/, parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value.toString()), 16)];
                            }
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Initialized the smart contract.  This is a mandatory step that must occur prior to using the contract for the first time.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param wif  The contract admin WIF.
     */
    NeoContractLX.initSmartContract = function (network, lxContractHash, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'admin';
                args = [neon_js_1.u.str2hexstring('InitSmartContract')];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    /**
     * Checks if presale allocations are locked.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     */
    NeoContractLX.isPresaleAllocationLocked = function (network, lxContractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation;
            return __generator(this, function (_a) {
                operation = 'IsPresaleAllocationLocked';
                return [2 /*return*/, _1.NeoCommon.invokeFunction(network, lxContractHash, operation, [])];
            });
        });
    };
    /**
     * Mints tokens.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param neoAmount  The amount to mint.
     * @param wif  The contract admin WIF.
     */
    NeoContractLX.mintTokens = function (network, lxContractHash, neoAmount, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, _api, account, script, invoke;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'mintTokens';
                        neon_js_1.default.add.network(network);
                        _api = new neon_js_1.api.neoscan.instance(network.name);
                        account = new neon_js_1.wallet.Account(wif);
                        script = neon_js_1.default.create.script({
                            scriptHash: lxContractHash,
                            operation: operation,
                            args: [],
                        });
                        invoke = {
                            api: _api,
                            url: network.extra.rpcServer,
                            account: account,
                            intents: neon_js_1.api.makeIntent({ NEO: neoAmount }, lxContractHash),
                            script: script,
                        };
                        return [4 /*yield*/, neon_js_1.default.doInvoke(invoke)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Sets a group's unlock block to a token sale.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param group  The target group number.
     * @param block  The unlock block height.
     * @param wif  The contract admin wif.
     */
    NeoContractLX.setGroupUnlockBlock = function (network, lxContractHash, group, block, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'SetGroupUnlockBlock';
                args = [group, block];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    /**
     * Gets the contract's token symbol.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     */
    NeoContractLX.symbol = function (network, lxContractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'symbol';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, lxContractHash, operation, [])];
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
     * Gets the token's total supply.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     */
    NeoContractLX.totalSupply = function (network, lxContractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'totalSupply';
                        return [4 /*yield*/, _1.NeoCommon.invokeFunction(network, lxContractHash, operation, [])];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.fixed82num(response.result.stack[0].value === '' ? '00' : response.result.stack[0].value)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Transfers tokens between two addresses if the spender has custody of enough tokens.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param toAddress  The address to transfer to.
     * @param amount  The amount of tokens to transfer.
     * @param wif  The token holder's WIF.
     */
    NeoContractLX.transfer = function (network, lxContractHash, toAddress, amount, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, account, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'transfer';
                        account = new neon_js_1.wallet.Account(wif);
                        args = [neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(account.address)), neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(toAddress)), amount];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Transfers tokens on behalf of another user.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param fromAddress  The address to transfer from.
     * @param toAddress  The address to transfer to.
     * @param amount  The amount to transfer.
     * @param wif  The wif of the user wishing to initiate the transfer.
     */
    NeoContractLX.transferFrom = function (network, lxContractHash, fromAddress, toAddress, amount, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, invokeAccount, args;
            return __generator(this, function (_a) {
                operation = 'transferFrom';
                invokeAccount = new neon_js_1.wallet.Account(wif);
                args = [neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(invokeAccount.address)), neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(fromAddress)), neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(toAddress)), amount];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    /**
     * Updates the contract admin.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The new contract admin.
     * @param wif  The contract admin WIF.
     */
    NeoContractLX.updateAdminAddress = function (network, lxContractHash, address, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'admin';
                args = [neon_js_1.u.str2hexstring('UpdateAdminAddress'), neon_js_1.u.reverseHex(address)];
                return [2 /*return*/, _1.NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    /**
     * Unlocks founder tokens.
     * @param network  The Neo network target.
     * @param lxContractHash  The LX script hash found (Here).
     * @param address  The target founder address.
     * @param period  The vesting period to unlock.
     * @param wif  The contract admin wif.
     */
    NeoContractLX.unlockFoundersTokens = function (network, lxContractHash, address, period, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'admin';
                        args = [neon_js_1.u.str2hexstring('UnlockFoundersTokens'), neon_js_1.u.reverseHex(neon_js_1.wallet.getScriptHashFromAddress(address)), period];
                        return [4 /*yield*/, _1.NeoCommon.contractInvocation(network, lxContractHash, operation, args, wif)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return NeoContractLX;
}());
exports.NeoContractLX = NeoContractLX;
//# sourceMappingURL=neo-contract-lx.js.map