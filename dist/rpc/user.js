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
const defaultId = '0';
const defaultMethodVersion = 1;
class AsteroidUserRpc {
    static registerEmail(rpcUrl, params, id = defaultId, methodVersion = defaultMethodVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.RegisterEmail';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion);
        });
    }
    static registerEmailWithSecret(rpcUrl, params, id = defaultId, methodVersion = defaultMethodVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.RegisterEmailWithSecret';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion);
        });
    }
    static updatePassword(rpcUrl, params, id = defaultId, methodVersion = defaultMethodVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdatePassword';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion);
        });
    }
    static updatePasswordJwt(rpcUrl, params, id = defaultId, methodVersion = defaultMethodVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.UpdatePasswordJWT';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion);
        });
    }
    static requestPasswordReset(rpcUrl, params, id = defaultId, methodVersion = defaultMethodVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.RequestPasswordReset';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion);
        });
    }
    static newAccessToken(rpcUrl, params, id = defaultId, methodVersion = defaultMethodVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'User.NewAccessToken';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion);
        });
    }
}
exports.AsteroidUserRpc = AsteroidUserRpc;
//# sourceMappingURL=user.js.map