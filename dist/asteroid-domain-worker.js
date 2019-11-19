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
const lodash_1 = require("lodash");
const node_log_it_1 = require("node-log-it");
const rpc_1 = require("./rpc");
const rest_1 = require("./rest");
const helpers_1 = require("./helpers");
const MODULE_NAME = 'AsteroidDomainWorker';
const DEFAULT_OPTIONS = {
    networkType: 'production',
    networkConfig: undefined,
    accessToken: undefined,
    id: '0',
    loggerOptions: {},
};
class AsteroidDomainWorker {
    constructor(options = {}) {
        this.options = lodash_1.merge({}, DEFAULT_OPTIONS, options);
        this.validateOptionalParameters();
        this.currentAccessToken = this.options.accessToken;
        this.logger = new node_log_it_1.Logger(MODULE_NAME, this.options.loggerOptions);
        this.logger.debug('constructor completes.');
    }
    get baseUrl() {
        if (this.options.networkConfig) {
            return this.options.networkConfig.asteroidDomainUserBaseUrl;
        }
        if (this.options.networkType) {
            return helpers_1.NetworkHelper.getAsteroidDomainWorkerBaseUrl(this.options.networkType);
        }
        throw new Error('Unable to determine baseUrl.');
    }
    get accessToken() {
        return this.currentAccessToken;
    }
    get id() {
        return this.options.id;
    }
    setAccessToken(token) {
        this.currentAccessToken = token;
    }
    getVersionInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield rest_1.rest.worker.getVersion(this.baseUrl);
        });
    }
    claimTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('claimTask triggered.');
            const req = {
                access_token: this.accessToken,
                task_id: taskId,
            };
            yield rpc_1.rpc.worker.claimTask(this.baseUrl, req, this.id);
        });
    }
    createTask(taskType, taskVersion, taskPriority, target) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('createTask triggered.');
            const req = {
                access_token: this.accessToken,
                task_type: taskType,
                task_version: taskVersion,
                task_priority: taskPriority,
                payload: {
                    target,
                },
            };
            const res = yield rpc_1.rpc.worker.createTask(this.baseUrl, req, this.id);
            return res.task_id;
        });
    }
    getActiveTaskIds() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getActiveTaskIds triggered.');
            const req = {
                access_token: this.accessToken,
            };
            const res = yield rpc_1.rpc.worker.getActiveTaskIds(this.baseUrl, req, this.id);
            return res.task_ids;
        });
    }
    getTaskById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getTaskById triggered.');
            const req = {
                access_token: this.accessToken,
                task_id: taskId,
            };
            const res = yield rpc_1.rpc.worker.getTaskById(this.baseUrl, req, this.id);
            return res;
        });
    }
    getUnclaimedTask(taskTypes) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('getUnclaimedTask triggered.');
            const req = {
                access_token: this.accessToken,
                task_types: taskTypes,
            };
            const res = yield rpc_1.rpc.worker.getUnclaimedTask(this.baseUrl, req, this.id);
            return res;
        });
    }
    resolveTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('resolveTask triggered.');
            const req = {
                access_token: this.accessToken,
                task_id: taskId,
            };
            yield rpc_1.rpc.worker.resolveTask(this.baseUrl, req, this.id);
        });
    }
    unclaimTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('unclaimTask triggered.');
            const req = {
                access_token: this.accessToken,
                task_id: taskId,
            };
            yield rpc_1.rpc.worker.unclaimTask(this.baseUrl, req, this.id);
        });
    }
    registerWorker(accessPoint) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('registerWorker triggered.');
            const req = {
                access_token: this.accessToken,
                access_point: accessPoint,
            };
            yield rpc_1.rpc.worker.registerWorker(this.baseUrl, req, this.id);
        });
    }
    validateOptionalParameters() {
        if (!this.options.networkType && !this.options.networkConfig) {
            throw new Error(`Require to provide either 'networkType' or 'networkConfig'.`);
        }
        if (this.options.id === undefined) {
            throw new Error(`Require to provide 'id'.`);
        }
    }
}
exports.AsteroidDomainWorker = AsteroidDomainWorker;
//# sourceMappingURL=asteroid-domain-worker.js.map