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
class AsteroidWorkerRpc {
    static claimTask(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'Worker.ClaimTask';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static createTask(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'Worker.CreateTask';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static getActiveTaskIds(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'Worker.GetActiveTaskIDs';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static getTaskById(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'Worker.GetTaskByID';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static getUnclaimedTask(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'Worker.GetUnclaimedTask';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static resolveTask(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'Worker.ResolveTask';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static unclaimTask(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'Worker.UnclaimTask';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
    static registerWorker(rpcUrl, params, id = constants_1.rpcDefaults.id, methodVersion = constants_1.rpcDefaults.methodVersion, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = 'Worker.RegisterWorker';
            return yield base_1.invoke(rpcUrl, method, params, id, methodVersion, config);
        });
    }
}
exports.AsteroidWorkerRpc = AsteroidWorkerRpc;
//# sourceMappingURL=worker.js.map