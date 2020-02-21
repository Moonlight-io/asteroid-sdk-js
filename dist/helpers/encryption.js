"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var elliptic_1 = __importDefault(require("elliptic"));
var neon_js_1 = require("@cityofzion/neon-js");
var _1 = require(".");
var Encryption = /** @class */ (function () {
    function Encryption() {
    }
    // consider changing to GCM
    Encryption.aes256CbcEncrypt = function (iv, key, plaintext) {
        var cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
        var firstChunk = cipher.update(plaintext);
        var secondChunk = cipher.final();
        return Buffer.concat([firstChunk, secondChunk]);
    };
    Encryption.aes256CbcDecrypt = function (iv, key, ciphertext) {
        var cipher = crypto_1.default.createDecipheriv('aes-256-cbc', key, iv);
        var firstChunk = cipher.update(ciphertext);
        var secondChunk = cipher.final();
        return Buffer.concat([firstChunk, secondChunk]);
    };
    /**
     * decrypts an ECIES encryption payload
     * @param privateKey - the private key of the recipient
     * @param payload - the ECIES payload
     */
    Encryption.p256ECIESDecrypt = function (privateKey, payload) {
        var curve = new elliptic_1.default.ec('p256');
        var ephemPublicKey = curve.keyFromPublic(payload.ephemPublicKey, 'hex');
        var privKey = curve.keyFromPrivate(privateKey, 'hex');
        var px = privKey.derive(ephemPublicKey.getPublic());
        var hash = crypto_1.default
            .createHash('sha512')
            .update(px.toString('hex'))
            .digest();
        var encryptionKey = hash.slice(0, 32);
        // verify the hmac
        var macKey = hash.slice(32);
        var dataToMac = Buffer.concat([Buffer.from(payload.iv, 'hex'), Buffer.from(payload.ephemPublicKey, 'hex'), Buffer.from(payload.ciphertext, 'hex')]);
        var realMac = crypto_1.default
            .createHmac('sha256', macKey)
            .update(dataToMac)
            .digest();
        if (payload.mac !== realMac.toString('hex')) {
            throw new Error('invalid payload: hmac misalignment');
        }
        return Encryption.aes256CbcDecrypt(Buffer.from(payload.iv, 'hex'), encryptionKey, Buffer.from(payload.ciphertext, 'hex'));
    };
    /**
     * encrypts a buffer using ECIES and returns a payload containing the message and signature.
     * @param publicKey - the public key of the recipient
     * @param payload - the payload buffer to encrypt
     * @param opts - optional parameters which will default if not configured
     */
    Encryption.p256ECIESEncrypt = function (publicKey, payload, opts) {
        var curve = new elliptic_1.default.ec('p256');
        var pub = curve.keyFromPublic(publicKey, 'hex').getPublic();
        var op = opts || {};
        var ephem = curve.genKeyPair();
        var ephemPublicKey = ephem.getPublic(true, 'hex');
        // create the shared ECHD secret
        var px = ephem.derive(pub);
        // hash the secret
        var hash = crypto_1.default
            .createHash('sha512')
            .update(px.toString('hex'))
            .digest();
        // define the initiation vector
        var iv = op.iv || crypto_1.default.randomBytes(16);
        var encryptionKey = hash.slice(0, 32);
        var macKey = hash.slice(32);
        var ciphertext = Encryption.aes256CbcEncrypt(iv, encryptionKey, payload);
        var dataToMac = Buffer.concat([iv, Buffer.from(ephemPublicKey, 'hex'), ciphertext]);
        var hmacSha = crypto_1.default
            .createHmac('sha256', macKey)
            .update(dataToMac)
            .digest();
        var mac = Buffer.from(hmacSha);
        return {
            iv: iv.toString('hex'),
            ephemPublicKey: ephemPublicKey,
            ciphertext: ciphertext.toString('hex'),
            mac: mac.toString('hex'),
        };
    };
    /**
     * formats an attestation using hybrid(PGP-like) encryption
     * @param attestation
     * @returns {string}
     */
    Encryption.encryptionHybrid = function (attestation) {
        switch (typeof attestation.value) {
            case 'boolean':
                return _1.ClaimsHelper.intToHexWithLengthPrefix(attestation.value ? 1 : 0);
            case 'number':
                return neon_js_1.u.num2fixed8(attestation.value);
            case 'string':
                return _1.ClaimsHelper.stringToHexWithLengthPrefix(attestation.value);
            default:
                throw new Error('unhandled attestation type');
        }
    };
    /**
     * formats an unencrypted attestation value
     * @param {Object} attestation
     * @returns {Object}
     */
    Encryption.encryptionUnencrypted = function (attestation) {
        switch (typeof attestation.value) {
            case 'boolean':
                return _1.ClaimsHelper.intToHexWithLengthPrefix(attestation.value ? 1 : 0);
            case 'number':
                return neon_js_1.u.num2fixed8(attestation.value);
            case 'string':
                return _1.ClaimsHelper.stringToHexWithLengthPrefix(attestation.value);
            default:
                throw new Error('unhandled attestation type');
        }
    };
    /**
     * formats an attestation using zkpp
     * @param attestation
     * @returns {string}
     */
    Encryption.encryptionZKPP = function (attestation) {
        if (!attestation.nonce) {
            throw new Error('this encryption method requires a nonce key');
        }
        throw new Error('this encryption method is not currently supported');
    };
    /**
     * formats an attestation value using symmentric encryption
     * @param attestation
     * @returns {string}
     */
    Encryption.encryptionSymmetric = function (attestation) {
        if (!attestation.secret) {
            throw new Error('this encryption method requires a secret key');
        }
        throw new Error('this encryption method is not currently supported');
    };
    /**
     * formats an attestation value signed by the claim issuer
     * @param {Object} attestation
     * @param {wallet.account} account
     * @returns {Object}
     */
    Encryption.encryptionAsymmetric = function (attestation, account) {
        var fieldValue = neon_js_1.wallet.sign(attestation.value, account.privateKey);
        return _1.ClaimsHelper.hexStringWithLengthPrefix(fieldValue);
    };
    return Encryption;
}());
exports.Encryption = Encryption;
//# sourceMappingURL=encryption.js.map