"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var neon_js_1 = require("@cityofzion/neon-js");
var crypto_1 = __importDefault(require("crypto"));
var elliptic_1 = __importDefault(require("elliptic"));
var claim_encryption_1 = require("../constants/claim_encryption");
var ClaimsHelper = /** @class */ (function () {
    function ClaimsHelper() {
    }
    //consider changing to GCM
    ClaimsHelper.aes256CbcEncrypt = function (iv, key, plaintext) {
        var cipher = crypto_1.default.createCipheriv("aes-256-cbc", key, iv);
        var firstChunk = cipher.update(plaintext);
        var secondChunk = cipher.final();
        return Buffer.concat([firstChunk, secondChunk]);
    };
    ClaimsHelper.aes256CbcDecrypt = function (iv, key, ciphertext) {
        var cipher = crypto_1.default.createDecipheriv("aes-256-cbc", key, iv);
        var firstChunk = cipher.update(ciphertext);
        var secondChunk = cipher.final();
        return Buffer.concat([firstChunk, secondChunk]);
    };
    /**
     * decrypts an ECIES encryption payload
     * @param privateKey - the private key of the recipient
     * @param payload - the ECIES payload
     */
    ClaimsHelper.decryptECIES = function (privateKey, payload) {
        var curve = new elliptic_1.default.ec("p256");
        var ephemPublicKey = curve.keyFromPublic(payload.ephemPublicKey, "hex");
        var privKey = curve.keyFromPrivate(privateKey, "hex");
        var Px = privKey.derive(ephemPublicKey.getPublic());
        var hash = crypto_1.default.createHash("sha512").update(Px.toString("hex")).digest();
        var encryptionKey = hash.slice(0, 32);
        //verify the hmac
        var macKey = hash.slice(32);
        var dataToMac = Buffer.concat([
            Buffer.from(payload.iv, "hex"),
            Buffer.from(payload.ephemPublicKey, "hex"),
            Buffer.from(payload.ciphertext, "hex")
        ]);
        var realMac = crypto_1.default.createHmac("sha256", macKey).update(dataToMac).digest();
        if (payload.mac != realMac.toString("hex")) {
            throw new Error("invalid payload: hmac misalignment");
        }
        return ClaimsHelper.aes256CbcDecrypt(Buffer.from(payload.iv, "hex"), encryptionKey, Buffer.from(payload.ciphertext, "hex"));
    };
    /**
     * formats an attestation using hybrid(PGP-like) encryption
     * @param attestation
     * @returns {string}
     */
    ClaimsHelper.encryptionHybrid = function (attestation) {
        //throw new Error('this encryption method is not currently supported')
        switch (typeof attestation.value) {
            case 'boolean':
                return ClaimsHelper.intToHexWithLengthPrefix(attestation.value ? 1 : 0);
            case 'number':
                return neon_js_1.u.num2fixed8(attestation.value);
            case 'string':
                return ClaimsHelper.stringToHexWithLengthPrefix(attestation.value);
            default:
                throw new Error('unhandled attestation type');
        }
    };
    /**
     * formats an unencrypted attestation value
     * @param {Object} attestation
     * @returns {Object}
     */
    ClaimsHelper.encryptionUnencrypted = function (attestation) {
        switch (typeof attestation.value) {
            case 'boolean':
                return ClaimsHelper.intToHexWithLengthPrefix(attestation.value ? 1 : 0);
            case 'number':
                return neon_js_1.u.num2fixed8(attestation.value);
            case 'string':
                return ClaimsHelper.stringToHexWithLengthPrefix(attestation.value);
            default:
                throw new Error('unhandled attestation type');
        }
    };
    /**
     * formats an attestation using zkpp
     * @param attestation
     * @returns {string}
     */
    ClaimsHelper.encryptionZKPP = function (attestation) {
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
    ClaimsHelper.encryptionSymmetric = function (attestation) {
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
    ClaimsHelper.encryptionAsymmetric = function (attestation, account) {
        var fieldValue = neon_js_1.wallet.sign(attestation.value, account.privateKey);
        return ClaimsHelper.hexStringWithLengthPrefix(fieldValue);
    };
    /**
     * encrypts a buffer using ECIES and returns a payload containing the message and signature.
     * @param publicKey - the public key of the recipient
     * @param payload - the payload buffer to encrypt
     * @param opts - optional parameters which will default if not configured
     */
    ClaimsHelper.encryptECIES = function (publicKey, payload, opts) {
        var curve = new elliptic_1.default.ec("p256");
        var pub = curve.keyFromPublic(publicKey, "hex")
            .getPublic();
        var op = opts || {};
        var ephem = curve.genKeyPair();
        var ephemPublicKey = ephem.getPublic(true, "hex");
        //create the shared ECHD secret
        var Px = ephem.derive(pub);
        //hash the secret
        var hash = crypto_1.default.createHash("sha512").update(Px.toString("hex")).digest();
        //define the initiation vector
        var iv = op.iv || crypto_1.default.randomBytes(16);
        var encryptionKey = hash.slice(0, 32);
        var macKey = hash.slice(32);
        var ciphertext = ClaimsHelper.aes256CbcEncrypt(iv, encryptionKey, payload);
        var dataToMac = Buffer.concat([
            iv,
            Buffer.from(ephemPublicKey, "hex"),
            ciphertext
        ]);
        var hmacSha = crypto_1.default.createHmac("sha256", macKey).update(dataToMac).digest();
        var mac = Buffer.from(hmacSha);
        return {
            iv: iv.toString("hex"),
            ephemPublicKey: ephemPublicKey,
            ciphertext: ciphertext.toString("hex"),
            mac: mac.toString("hex"),
        };
    };
    ClaimsHelper.formatAttestation = function (attestation, issuer, sub) {
        if (!('identifier' in attestation) || !('remark' in attestation) || !('encryption' in attestation) || !('value' in attestation)) {
            throw new Error('attestation is missing a required field');
        }
        var fieldIdentifier = ClaimsHelper.stringToHexWithLengthPrefix(attestation.identifier);
        var fieldRemark = ClaimsHelper.stringToHexWithLengthPrefix(attestation.remark);
        var fieldValue;
        switch (attestation.encryption) {
            case 'unencrypted':
                fieldValue = ClaimsHelper.encryptionUnencrypted(attestation);
                break;
            case 'asymmetric_iss':
                fieldValue = ClaimsHelper.encryptionAsymmetric(attestation, issuer);
                break;
            case 'asymmetric_sub':
                fieldValue = ClaimsHelper.encryptionAsymmetric(attestation, sub);
                break;
            case 'zkpp':
                fieldValue = ClaimsHelper.encryptionZKPP(attestation);
                break;
            case 'symmetric':
                fieldValue = ClaimsHelper.encryptionSymmetric(attestation);
                break;
            case 'hybrid':
                fieldValue = ClaimsHelper.encryptionHybrid(attestation);
                break;
            default:
                throw new Error('an encryption type must be provided for each attestation');
        }
        var encryptionMode = claim_encryption_1.claimEncryptionModes[attestation.encryption];
        var formattedEncryptionMode = ClaimsHelper.intToHexWithLengthPrefix(encryptionMode);
        return 80 + neon_js_1.u.int2hex(4) + '00' + formattedEncryptionMode + '00' + fieldIdentifier + '00' + fieldRemark + '00' + fieldValue;
    };
    ClaimsHelper.hexLength = function (hexString) {
        var size = hexString.length / 2;
        if (size <= 75) {
            return neon_js_1.u.num2hexstring(size);
        }
        else if (size < 0x100) {
            return neon_js_1.u.num2hexstring(size);
        }
        else if (size < 0x10000) {
            return neon_js_1.u.num2hexstring(size, 2, true);
        }
        else if (size < 0x100000000) {
            return neon_js_1.u.num2hexstring(size, 4, true);
        }
        throw new Error('hexString is too big to use: ' + hexString);
    };
    ClaimsHelper.hexStringWithLengthPrefix = function (hexValue) {
        var bytes = neon_js_1.u.hexstring2ab(hexValue);
        var len = neon_js_1.u.int2hex(bytes.length);
        return len + hexValue;
    };
    ClaimsHelper.encryptionModeStrFromHex = function (value) {
        var intValue = parseInt(value, 16);
        return Object.keys(claim_encryption_1.claimEncryptionModes).find(function (key) { return claim_encryption_1.claimEncryptionModes[key] === intValue; });
    };
    ClaimsHelper.intToHexWithLengthPrefix = function (value) {
        var bytes = neon_js_1.u.int2hex(value);
        var len = neon_js_1.u.int2hex(bytes.length / 2);
        return len + bytes;
    };
    ClaimsHelper.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    ClaimsHelper.isFloat = function (n) {
        return Number(n) === n && n % 1 !== 0;
    };
    ClaimsHelper.stringToHexWithLengthPrefix = function (value) {
        var bytes = neon_js_1.u.str2ab(value || '');
        var len = neon_js_1.u.int2hex(bytes.length);
        return len + neon_js_1.u.ab2hexstring(bytes);
    };
    return ClaimsHelper;
}());
exports.ClaimsHelper = ClaimsHelper;
//# sourceMappingURL=claims-helper.js.map