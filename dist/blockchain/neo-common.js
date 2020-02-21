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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var neon_js_1 = __importStar(require("@cityofzion/neon-js"));
var NeoCommon = /** @class */ (function () {
    function NeoCommon() {
    }
    /**
     * Attempt to retrieve the contract name (defined within the contract) that will be used for CNS
     * @returns {Promise<string|boolean>}
     */
    NeoCommon.getContractName = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getContractName';
                        args = [];
                        return [4 /*yield*/, NeoCommon.invokeFunction(network, contractHash, operation, args)];
                    case 1:
                        response = _a.sent();
                        if (response.result.stack.length > 0) {
                            return [2 /*return*/, neon_js_1.u.hexstring2str(response.result.stack[0].value.toString())];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    NeoCommon.getContractVersion = function (network, contractHash) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = 'getContractVersion';
                        return [4 /*yield*/, NeoCommon.invokeFunction(network, contractHash, operation, [])];
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
    NeoCommon.initSmartContract = function (network, contractHash, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'admin';
                args = [neon_js_1.u.str2hexstring('initSmartContract')];
                return [2 /*return*/, NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 0, 0.01)];
            });
        });
    };
    /**
     * Return the scriptHash for a file
     */
    NeoCommon.getScriptHashForData = function (data) {
        return neon_js_1.u.reverseHex(neon_js_1.u.hash160(data));
    };
    /**
     * Claim gas for account
     */
    NeoCommon.claimGas = function (network, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var account, _api, config;
            return __generator(this, function (_a) {
                account = new neon_js_1.wallet.Account(wif);
                neon_js_1.default.add.network(network);
                _api = new neon_js_1.api.neoscan.instance(network.name);
                config = {
                    api: _api,
                    url: network.extra.rpcServer,
                    account: account,
                };
                return [2 /*return*/, neon_js_1.default.claimGas(config)];
            });
        });
    };
    /**
     * Transfer neo or gas to an address
     */
    NeoCommon.transferAsset = function (network, wifFrom, addressTo, neoAmount, gasAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var account, _api, assets, intent, config;
            return __generator(this, function (_a) {
                account = new neon_js_1.wallet.Account(wifFrom);
                neon_js_1.default.add.network(network);
                _api = new neon_js_1.api.neoscan.instance(network.name);
                assets = {};
                if (neoAmount > 0) {
                    assets.NEO = neoAmount;
                }
                if (gasAmount > 0) {
                    assets.GAS = gasAmount;
                }
                intent = neon_js_1.api.makeIntent(assets, addressTo);
                config = {
                    api: _api,
                    url: network.extra.rpcServer,
                    account: account,
                    intents: intent,
                };
                return [2 /*return*/, neon_js_1.default.sendAsset(config)];
            });
        });
    };
    /**
     * transfers all an accounts neo to itself, then claims the gas.
     * @param network
     * @param wif
     * @returns {Promise<any>}
     */
    NeoCommon.transferAndClaim = function (network, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var account, _api, balances, i, claims;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        neon_js_1.default.add.network(network);
                        account = new neon_js_1.wallet.Account(wif);
                        _api = new neon_js_1.api.neoscan.instance(network.name);
                        return [4 /*yield*/, NeoCommon.getAssetBalanceSummary(network, account.address)];
                    case 1:
                        balances = _a.sent();
                        return [4 /*yield*/, NeoCommon.transferAsset(network, account.WIF, account.address, balances.NEO, 0)];
                    case 2:
                        _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < 30)) return [3 /*break*/, 7];
                        return [4 /*yield*/, _api.getClaims(account.address)];
                    case 4:
                        claims = _a.sent();
                        if (claims.claims.length > 0) {
                            return [3 /*break*/, 7];
                        }
                        return [4 /*yield*/, NeoCommon.sleep(1000)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7: return [2 /*return*/, NeoCommon.claimGas(network, account.WIF)];
                }
            });
        });
    };
    /**
     * Get a balance of all unspent assets for address
     */
    NeoCommon.getAssetBalanceSummary = function (network, address) {
        return __awaiter(this, void 0, void 0, function () {
            var _api, coins, balances, _loop_1, n;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        neon_js_1.default.add.network(network);
                        _api = new neon_js_1.api.neoscan.instance(network.name);
                        return [4 /*yield*/, _api.getBalance(address)];
                    case 1:
                        coins = _a.sent();
                        balances = { NEO: 0, GAS: 0 };
                        _loop_1 = function (n) {
                            if (coins.assets[n]) {
                                coins.assets[n].unspent.forEach(function (val) {
                                    balances[n] += parseFloat(val.value.toString());
                                });
                            }
                        };
                        for (n in balances) {
                            _loop_1(n);
                        }
                        return [2 /*return*/, balances];
                }
            });
        });
    };
    /**
     * Invoke a contract method (readonly) and expect a response
     */
    NeoCommon.invokeFunction = function (network, contractHash, operation, args) {
        if (args === void 0) { args = []; }
        return __awaiter(this, void 0, void 0, function () {
            var invocation;
            return __generator(this, function (_a) {
                invocation = {
                    scriptHash: contractHash,
                    operation: operation,
                    args: args,
                };
                return [2 /*return*/, NeoCommon.scriptInvocation(network, invocation)];
            });
        });
    };
    /**
     * Deploy a contract to the neo network
     */
    NeoCommon.deployContract = function (network, avmData, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var account, _api, sb, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        account = new neon_js_1.wallet.Account(wif);
                        neon_js_1.default.add.network(network);
                        _api = new neon_js_1.api.neoscan.instance(network.name);
                        sb = neon_js_1.default.create.scriptBuilder();
                        sb.emitPush(neon_js_1.u.str2hexstring('')) // description
                            .emitPush(neon_js_1.u.str2hexstring('')) // email
                            .emitPush(neon_js_1.u.str2hexstring('')) // author
                            .emitPush(neon_js_1.u.str2hexstring('')) // code_version
                            .emitPush(neon_js_1.u.str2hexstring('')) // name
                            .emitPush(0x03) // storage: {none: 0x00, storage: 0x01, dynamic: 0x02, storage+dynamic:0x03}
                            .emitPush('05') // expects hexstring  (_emitString) // usually '05'
                            .emitPush('0710') // expects hexstring  (_emitString) // usually '0710'
                            .emitPush(avmData) // script
                            .emitSysCall('Neo.Contract.Create');
                        config = {
                            api: _api,
                            url: network.extra.rpcServer,
                            account: account,
                            script: sb.str,
                            fees: 1,
                            gas: 990,
                        };
                        return [4 /*yield*/, neon_js_1.default.doInvoke(config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Initiate a read-only event to the rpc server
     */
    NeoCommon.scriptInvocation = function (network, scripts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, neon_js_1.rpc.Query.invokeScript(neon_js_1.default.create.script(scripts)).execute(network.extra.rpcServer)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Initiate a contract invocation
     */
    NeoCommon.contractInvocation = function (network, contractHash, operation, args, wif, gas, fee) {
        if (gas === void 0) { gas = 0; }
        if (fee === void 0) { fee = 0.001; }
        return __awaiter(this, void 0, void 0, function () {
            var _api, account, props, script, invoke;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        neon_js_1.default.add.network(network);
                        _api = new neon_js_1.api.neoscan.instance(network.name);
                        account = new neon_js_1.wallet.Account(wif);
                        props = {
                            scriptHash: contractHash,
                            operation: operation,
                            args: args,
                        };
                        script = neon_js_1.default.create.script(props);
                        invoke = {
                            url: network.extra.rpcServer,
                            api: _api,
                            account: account,
                            script: script,
                            gas: gas,
                            fees: fee,
                        };
                        return [4 /*yield*/, neon_js_1.default.doInvoke(invoke)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NeoCommon.contractMigrate = function (network, contractHash, avmData, parameterTypes, returnType, needStorage, name, version, author, email, description, wif) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, args;
            return __generator(this, function (_a) {
                operation = 'admin';
                args = [
                    neon_js_1.u.str2hexstring('contractMigrate'),
                    avmData,
                    parameterTypes,
                    returnType,
                    neon_js_1.u.int2hex(needStorage),
                    neon_js_1.u.str2hexstring(name),
                    neon_js_1.u.str2hexstring(version),
                    neon_js_1.u.str2hexstring(author),
                    neon_js_1.u.str2hexstring(email),
                    neon_js_1.u.str2hexstring(description),
                ];
                NeoCommon.contractInvocation(network, contractHash, operation, args, wif, 500, 1);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Parse a neon-js response when expecting a boolean value
     */
    NeoCommon.expectBoolean = function (response) {
        if (response.result && response.result.stack.length > 0) {
            return !(response.result.stack[0].value === '' || !response.result.stack[0].value);
        }
        return false;
    };
    NeoCommon.sleep = function (milliseconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, milliseconds); })];
            });
        });
    };
    return NeoCommon;
}());
exports.NeoCommon = NeoCommon;
//# sourceMappingURL=neo-common.js.map