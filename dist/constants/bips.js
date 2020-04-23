"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elliptic = require("elliptic");
//MASTER SEEDS
exports.BIP32MasterSeeds = {
    neo: Buffer.from("Nist256p1 seed")
};
//PURPOSE
exports.BIP32Purposes = {
    BIP44: 0x8000002C
};
//COINS
exports.BIP32Coins = {
    neo: 0x80000378
};
//ACCOUNT
exports.BIP32Accounts = {
    firstHardenedChild: 0x80000000
};
exports.curves = {
    neo: new elliptic.ec('p256')
};
//# sourceMappingURL=bips.js.map