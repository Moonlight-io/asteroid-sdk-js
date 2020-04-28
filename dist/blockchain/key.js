"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var bs58 = __importStar(require("bs58"));
var Key = /** @class */ (function () {
    function Key(fields) {
        this.f = fields;
    }
    Key.prototype.getWIF = function () {
        var wif = Buffer.concat([Buffer.from('80', 'hex'), this.f.key, Buffer.from('01', 'hex')]);
        var sha256H = crypto_1.default
            .createHash('sha256')
            .update(wif)
            .digest();
        var sha256H2 = crypto_1.default
            .createHash('sha256')
            .update(sha256H)
            .digest();
        return bs58.encode(Buffer.concat([wif, sha256H2.slice(0, 4)]));
    };
    return Key;
}());
exports.Key = Key;
//# sourceMappingURL=key.js.map