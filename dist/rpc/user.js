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
const constants_1 = require("../constants");
class AsteroidUserRpc {
    static registerEmail(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.RegisterEmail';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static registerEmailWithSecret(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.RegisterEmailWithSecret';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static updatePassword(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdatePassword';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static updatePasswordJwt(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdatePasswordJWT';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static requestPasswordReset(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.RequestPasswordReset';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static loginEmail(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.LoginEmail';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static loginOauth(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.LoginOauth';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static setUserGroupByEmail(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.SetUserGroupByEmail';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static newAccessToken(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.NewAccessToken';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static logout(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.Logout';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static createAttributes(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.CreateAttributes';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static updateAttributes(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdateAttributes';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static deleteAttributes(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.DeleteAttributes';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static getAttributeHeadersByTypes(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetAttributeHeadersByTypes';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static getAttributesByIds(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetAttributesByIDs';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static createProfile(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.CreateProfile';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static deleteProfile(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.DeleteProfile';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static getOwnedProfileHeaders(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetOwnedProfileHeaders';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static modifyProfileComponents(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.ModifyProfileComponents';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static getProfileById(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetProfileByID';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static getFlatProfileById(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetFlatProfileByID';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static updateProfile(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdateProfile';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static getProfileByToken(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.GetProfileByToken';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
}
exports.AsteroidUserRpc = AsteroidUserRpc;
//# sourceMappingURL=user.js.map