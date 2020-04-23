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
var constants_1 = require("../constants");
var bip39 = __importStar(require("bip39"));
var bs58 = __importStar(require("bs58"));
var _key = /** @class */ (function () {
    function _key(fields) {
        this.f = fields;
    }
    _key.prototype.getWIF = function () {
        var wif = Buffer.concat([
            Buffer.from("80", "hex"),
            this.f.key,
            Buffer.from("01", "hex")
        ]);
        var sha256H = crypto_1.default
            .createHash("sha256")
            .update(wif)
            .digest();
        var sha256H2 = crypto_1.default
            .createHash("sha256")
            .update(sha256H)
            .digest();
        return bs58.encode(Buffer.concat([wif, sha256H2.slice(0, 4)]));
    };
    return _key;
}());
/**
 * A blockchain keykeychain for elliptic curve-based platforms
 * implements: BIP32, BIP39, BIP44
 */
var Key = /** @class */ (function () {
    function Key() {
        this.mnemonic = this.generateMnemonic();
        this.seed = this.generateSeed();
        this.secret = '';
    }
    /**
     * gernates a new child key for a chain along a derivation vector
     * @param platform
     * @param derivationPath (example:
     */
    Key.prototype.generateChildKey = function (platform, derivationPath) {
        var childKey = this.generateMasterKey(platform);
        var pathArray = derivationPath.split('/');
        if (pathArray[0] != 'm') {
            throw new Error("derivation path must be of format: m/x/x...");
        }
        pathArray = pathArray.slice(1);
        for (var _i = 0, pathArray_1 = pathArray; _i < pathArray_1.length; _i++) {
            var stringIdx = pathArray_1[_i];
            var childIdx = void 0;
            if (stringIdx.slice(-1) === "'") {
                childIdx = parseInt(stringIdx.slice(0, stringIdx.length - 1)) + constants_1.constants.BIP32Accounts.firstHardenedChild;
            }
            else {
                childIdx = parseInt(stringIdx);
            }
            childKey = this.newChildKey(platform, childKey, childIdx);
        }
        return childKey;
    };
    /**
     * generates a bip39 mnemonic for the key
     * @param strength
     */
    Key.prototype.generateMnemonic = function (strength) {
        if (strength === void 0) { strength = 256; }
        this.mnemonic = Buffer.from(bip39.generateMnemonic(strength));
        this.secret = '';
        this.seed = this.generateSeed(this.secret);
        return this.mnemonic;
    };
    /**
     * generates a bip39 compliant seed
     * @param secret
     */
    Key.prototype.generateSeed = function (secret) {
        if (secret === void 0) { secret = ''; }
        if (this.mnemonic.length == 0) {
            throw new Error("mnemonic required, but undefined");
        }
        this.secret = secret;
        this.seed = bip39.mnemonicToSeedSync(this.mnemonic.toString(), this.secret);
        return this.seed;
    };
    /**
     * imports a mnemonic into the key
     * @param mnemonic
     */
    Key.prototype.importMnemonic = function (mnemonic) {
        this.mnemonic = Buffer.from(mnemonic);
        this.secret = '';
        this.seed = this.generateSeed(this.secret);
    };
    /**
     * generates a new child key along a childIdx
     * @param platform
     * @param parentKey
     * @param childIdx
     */
    Key.prototype.newChildKey = function (platform, parentKey, childIdx) {
        var curve = constants_1.constants.curves[platform];
        var hardenedChild = childIdx >= constants_1.constants.BIP32Accounts.firstHardenedChild;
        var data;
        if (hardenedChild) {
            data = Buffer.concat([Buffer.from("00", 'hex'), parentKey.f.key]);
        }
        else {
            var pk = curve.keyFromPrivate(parentKey.f.key, "hex");
            data = Buffer.from(pk.getPublic().encodeCompressed());
        }
        var childIdBuffer = Buffer.from(childIdx.toString(16).padStart(8, '0'), 'hex');
        data = Buffer.concat([data, childIdBuffer]);
        var intermediary = crypto_1.default
            .createHmac('sha512', parentKey.f.chainCode)
            .update(data)
            .digest();
        var newKey;
        if (parentKey.f.isPrivate) {
            var k1 = BigInt('0x' + intermediary.slice(0, 32).toString("hex"));
            var k2 = BigInt('0x' + parentKey.f.key.toString("hex"));
            k1 = k1 + k2;
            k1 = k1 % BigInt(curve.n);
            var protoKey = k1.toString(16);
            newKey = Buffer.from(protoKey.padStart(64, '0'), "hex");
        }
        else {
            throw new Error("only private keys are supported for keygen");
        }
        return new _key({
            childNumber: childIdx,
            chainCode: intermediary.slice(32, intermediary.length),
            depth: parentKey.f.depth + 1,
            fingerprint: crypto_1.default.createHash("sha256").update(newKey).digest(),
            key: newKey,
            isPrivate: parentKey.f.isPrivate
        });
    };
    /**
     * generates a bip32 compliant master key
     * @param platform
     */
    Key.prototype.generateMasterKey = function (platform) {
        if (!(platform in constants_1.constants.BIP32MasterSeeds)) {
            throw new Error("requested chain is not supported");
        }
        else if (this.seed.length == 0) {
            throw new Error("invalid seed");
        }
        var hmac = crypto_1.default
            .createHmac('sha512', constants_1.constants.BIP32MasterSeeds[platform])
            .update(this.seed)
            .digest();
        var keyBytes = hmac.slice(0, 32);
        var chainCode = hmac.slice(32, hmac.length);
        return new _key({
            childNumber: 0,
            chainCode: chainCode,
            key: keyBytes,
            fingerprint: Buffer.from(0x0.toString(16)),
            depth: 0,
            isPrivate: true
        });
    };
    return Key;
}());
exports.Key = Key;
//# sourceMappingURL=key.js.map