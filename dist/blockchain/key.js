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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = void 0;
var crypto_1 = __importDefault(require("crypto"));
var bs58 = __importStar(require("bs58"));
var Key = /** @class */ (function () {
    function Key(fields) {
        this.f = fields;
    }
    Key.prototype.getWIF = function () {
        var wif = Buffer.concat([Buffer.from('80', 'hex'), this.f.key, Buffer.from('01', 'hex')]);
        var sha256H = crypto_1.default.createHash('sha256').update(wif).digest();
        var sha256H2 = crypto_1.default.createHash('sha256').update(sha256H).digest();
        return bs58.encode(Buffer.concat([wif, sha256H2.slice(0, 4)]));
    };
    return Key;
}());
exports.Key = Key;
//# sourceMappingURL=key.js.map