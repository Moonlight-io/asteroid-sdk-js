"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var neon_js_1 = require("@cityofzion/neon-js");
var claim_encryption_1 = require("../constants/claim_encryption");
var _1 = require(".");
var ClaimsHelper = /** @class */ (function () {
    function ClaimsHelper() {
    }
    ClaimsHelper.encryptionModeStrFromHex = function (value) {
        var intValue = parseInt(value, 16);
        return Object.keys(claim_encryption_1.claimEncryptionModes).find(function (key) { return claim_encryption_1.claimEncryptionModes[key] === intValue; });
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
                fieldValue = _1.Encryption.encryptionUnencrypted(attestation);
                break;
            case 'asymmetric_iss':
                fieldValue = _1.Encryption.encryptionAsymmetric(attestation, issuer);
                break;
            case 'asymmetric_sub':
                fieldValue = _1.Encryption.encryptionAsymmetric(attestation, sub);
                break;
            case 'zkpp':
                fieldValue = _1.Encryption.encryptionZKPP(attestation);
                break;
            case 'symmetric':
                fieldValue = _1.Encryption.encryptionSymmetric(attestation);
                break;
            case 'hybrid':
                fieldValue = _1.Encryption.encryptionHybrid(attestation);
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