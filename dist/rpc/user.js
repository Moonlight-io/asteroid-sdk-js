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
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const rpc_defaults_1 = require("../constants/rpc-defaults");
const helpers_1 = require("../helpers");
class AsteroidUserRpc {
    static registerEmail(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.RegisterEmail';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static registerEmailWithSecret(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.RegisterEmailWithSecret';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static updatePassword(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdatePassword';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static updatePasswordJwt(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdatePasswordJWT';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static requestPasswordReset(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.RequestPasswordReset';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static loginEmail(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.LoginEmail';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static loginOauth(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.LoginOauth';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static setUserGroupByEmail(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.SetUserGroupByEmail';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static newAccessToken(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.NewAccessToken';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static logout(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.Logout';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static createAttributes(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.CreateAttributes';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static updateAttributes(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdateAttributes';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static deleteAttributes(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.DeleteAttributes';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static getAttributeHeadersByTypes(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetAttributeHeadersByTypes';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static getAttributesByIds(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetAttributesByIDs';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static createProfile(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.CreateProfile';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static deleteProfile(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.DeleteProfile';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static getOwnedProfileHeaders(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetOwnedProfileHeaders';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static modifyProfileComponents(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.ModifyProfileComponents';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static getProfileById(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetProfileByID';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static getFlatProfileById(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetFlatProfileByID';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static updateProfile(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdateProfile';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static getProfileByToken(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetProfileByToken';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static createProfilePrivToken(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.CreateProfilePrivToken';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static getProfilePrivs(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetProfilePrivs';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static updateProfilePriv(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdateProfilePriv';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static deleteProfilePriv(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.DeleteProfilePriv';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static sendProfileTokenByEmail(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.SendProfileTokenByEmail';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static getLogHeadersByTypes(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetLogHeadersByTypes';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static getLogsByIds(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetLogsByIDs';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static getLatestLogsByTypes(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetLatestLogsByTypes';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static submitWorkflowToken(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.SubmitWorkflowToken';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
    static createClaim(baseUrl, params, id = rpc_defaults_1.rpcDefaults.id, methodVersion = rpc_defaults_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.CreateClaim';
            return yield base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config);
        });
    }
}
exports.AsteroidUserRpc = AsteroidUserRpc;
//# sourceMappingURL=user.js.map