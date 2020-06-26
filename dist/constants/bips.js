"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curves = exports.bip32Accounts = exports.bip32Coins = exports.bip32Purposes = exports.bip32MasterSeeds = void 0;
var elliptic_1 = __importDefault(require("elliptic"));
// MASTER SEEDS
exports.bip32MasterSeeds = {
    neo: Buffer.from('Nist256p1 seed'),
};
// PURPOSE
exports.bip32Purposes = {
    BIP44: 0x8000002c,
};
// COINS
exports.bip32Coins = {
    neo: 0x80000378,
};
// ACCOUNT
exports.bip32Accounts = {
    firstHardenedChild: 0x80000000,
};
// ELLIPTICAL CURVES
exports.curves = {
    neo: new elliptic_1.default.ec('p256'),
};
//# sourceMappingURL=bips.js.map