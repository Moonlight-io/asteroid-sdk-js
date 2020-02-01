"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var neon_js_1 = require("@cityofzion/neon-js");
var claim_encryption_1 = require("../constants/claim_encryption");
var ClaimsHelper = /** @class */ (function () {
    function ClaimsHelper() {
    }
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