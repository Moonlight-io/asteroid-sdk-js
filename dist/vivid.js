"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginEmail = exports.go = exports.getProfileByToken = exports.getDecryptedClaim = void 0;
var asteroid_1 = require("./asteroid");
var blockchain_1 = require("./blockchain");
var bips_1 = require("./constants/bips");
var helpers_1 = require("./helpers");
var constants_1 = require("./constants");
/**
 * attempts to decrypt a claim payload using a seed for input.  This method will attempt to access the seed's keychain for reference data when
 * digesting claim attestations
 * @param claimId the claimId to decrypt
 * @param seed the bip39 seed requesting the data
 * @param platform the platform to operate on
 * @param network the network to operate on
 */
function getDecryptedClaim(claimId, seed, platform, network) {
    if (platform === void 0) { platform = 'neo'; }
    if (network === void 0) { network = 'production'; }
    return __awaiter(this, void 0, void 0, function () {
        var keychain, coin, childKey, neo2Network, cnsHash;
        return __generator(this, function (_a) {
            keychain = new blockchain_1.Keychain();
            keychain.importSeed(seed);
            coin = bips_1.bip32Coins[platform] - 0x80000000;
            childKey = keychain.generateChildKey(platform, "m/44'/" + coin + "'/0'/0/0");
            neo2Network = helpers_1.NetworkHelper.getNeo2Network(network);
            cnsHash = constants_1.constants.neo2CNSHash[network];
            return [2 /*return*/, blockchain_1.NeoVivid.getDecryptedClaimByClaimID(neo2Network, cnsHash, claimId, childKey.getWIF())];
        });
    });
}
exports.getDecryptedClaim = getDecryptedClaim;
/**
 * gets an identity profile using a token
 * @param token the identity token
 * @param asteroidEnvironment (optional) the asteroid environment to connect to
 */
function getProfileByToken(token, asteroidEnvironment) {
    if (asteroidEnvironment === void 0) { asteroidEnvironment = 'production'; }
    return __awaiter(this, void 0, void 0, function () {
        var asteroid;
        return __generator(this, function (_a) {
            asteroid = new asteroid_1.Asteroid({ networkType: asteroidEnvironment });
            return [2 /*return*/, asteroid.getProfileByToken(token)];
        });
    });
}
exports.getProfileByToken = getProfileByToken;
/**
 * Redirects the user to the vivid login view for the requested app and service
 * @param appId the application (defined in the vivid developer app)
 * @param serviceId the service ID defined in the vivid
 * @param state (optional) an optional parameter for flow control
 * @param domain (optional) the vivid platform to target
 */
function go(appId, serviceId, state, domain) {
    if (state === void 0) { state = ''; }
    if (domain === void 0) { domain = 'https://vivid.moonlight.io'; }
    window.location.replace(domain + "/sign-in/?login=oauth&app_id=" + appId + "&service_id=" + serviceId + "&state=" + state);
    return;
}
exports.go = go;
/**
 * authenticates and returns an asteroid user instance
 * @param email the user's email
 * @param password the user's password
 * @param asteroidEnvironment (optional) the asteroid environment to connect to.
 */
function loginEmail(email, password, asteroidEnvironment) {
    if (asteroidEnvironment === void 0) { asteroidEnvironment = 'production'; }
    return __awaiter(this, void 0, void 0, function () {
        var asteroid;
        return __generator(this, function (_a) {
            asteroid = new asteroid_1.Asteroid({ networkType: asteroidEnvironment });
            return [2 /*return*/, asteroid.loginEmail(email, password)];
        });
    });
}
exports.loginEmail = loginEmail;
//# sourceMappingURL=vivid.js.map