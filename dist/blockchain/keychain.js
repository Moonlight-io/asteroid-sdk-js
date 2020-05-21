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
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var constants_1 = require("../constants");
var bip39 = __importStar(require("bip39"));
var _1 = require(".");
/**
 * A blockchain keychain for elliptic curve-based platforms
 * implements: BIP32, BIP39, BIP44
 */
var Keychain = /** @class */ (function () {
    function Keychain() {
        this.mnemonic = this.generateMnemonic();
        this.seed = this.generateSeed();
        this.secret = '';
    }
    /**
     * generates a new child key for a chain along a derivation vector
     * @param platform
     * @param derivationPath (example:
     */
    Keychain.prototype.generateChildKey = function (platform, derivationPath) {
        var childKey = this.generateMasterKey(platform);
        var pathArray = derivationPath.split('/');
        if (pathArray[0] !== 'm') {
            throw new Error('derivation path must be of format: m/x/x...');
        }
        pathArray = pathArray.slice(1);
        for (var _i = 0, pathArray_1 = pathArray; _i < pathArray_1.length; _i++) {
            var stringIdx = pathArray_1[_i];
            var childIdx = void 0;
            if (stringIdx.slice(-1) === "'") {
                childIdx = parseInt(stringIdx.slice(0, stringIdx.length - 1), 10) + constants_1.constants.bip32Accounts.firstHardenedChild;
            }
            else {
                childIdx = parseInt(stringIdx, 10);
            }
            childKey = this.newChildKey(platform, childKey, childIdx);
        }
        return childKey;
    };
    /**
     * generates a bip39 mnemonic for the key
     * @param strength
     */
    Keychain.prototype.generateMnemonic = function (strength) {
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
    Keychain.prototype.generateSeed = function (secret) {
        if (secret === void 0) { secret = ''; }
        if (this.mnemonic === undefined) {
            throw new Error('mnemonic required, but undefined');
        }
        this.secret = secret;
        this.seed = bip39.mnemonicToSeedSync(this.mnemonic.toString(), this.secret);
        return this.seed;
    };
    /**
     * imports a mnemonic into the key
     * @param mnemonic
     */
    Keychain.prototype.importMnemonic = function (mnemonic) {
        this.mnemonic = Buffer.from(mnemonic);
        delete this.secret;
        this.seed = this.generateSeed(this.secret);
    };
    Keychain.prototype.importSeed = function (seed) {
        delete this.secret;
        this.seed = Buffer.from(seed, 'hex');
    };
    /**
     * generates a new child key along a childIdx
     * @param platform
     * @param parentKey
     * @param childIdx
     */
    Keychain.prototype.newChildKey = function (platform, parentKey, childIdx) {
        var curve = constants_1.constants.curves[platform];
        var hardenedChild = childIdx >= constants_1.constants.bip32Accounts.firstHardenedChild;
        var data;
        if (hardenedChild) {
            data = Buffer.concat([Buffer.from('00', 'hex'), parentKey.f.key]);
        }
        else {
            var pk = curve.keyFromPrivate(parentKey.f.key, 'hex');
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
            var k1 = new bignumber_js_1.default(intermediary.slice(0, 32).toString('hex'), 16);
            var k2 = new bignumber_js_1.default(parentKey.f.key.toString('hex'), 16);
            var c = new bignumber_js_1.default(curve.n);
            var protoKey = k1
                .plus(k2)
                .mod(c)
                .toString(16);
            newKey = Buffer.from(protoKey.padStart(64, '0'), 'hex');
        }
        else {
            throw new Error('only private keys are supported for keygen');
        }
        return new _1.Key({
            childNumber: childIdx,
            chainCode: intermediary.slice(32, intermediary.length),
            depth: parentKey.f.depth + 1,
            fingerprint: crypto_1.default
                .createHash('sha256')
                .update(newKey)
                .digest(),
            key: newKey,
            isPrivate: parentKey.f.isPrivate,
        });
    };
    /**
     * generates a bip32 compliant master key
     * @param platform
     */
    Keychain.prototype.generateMasterKey = function (platform) {
        if (!(platform in constants_1.constants.bip32MasterSeeds)) {
            throw new Error('requested chain is not supported');
        }
        else if (this.seed === undefined) {
            throw new Error('invalid seed');
        }
        var hmac = crypto_1.default
            .createHmac('sha512', constants_1.constants.bip32MasterSeeds[platform])
            .update(this.seed)
            .digest();
        return new _1.Key({
            childNumber: 0,
            chainCode: hmac.slice(32, hmac.length),
            key: hmac.slice(0, 32),
            fingerprint: Buffer.from((0x0).toString(16)),
            depth: 0,
            isPrivate: true,
        });
    };
    return Keychain;
}());
exports.Keychain = Keychain;
//# sourceMappingURL=keychain.js.map