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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const node_log_it_1 = require("node-log-it");
const build_url_1 = __importDefault(require("build-url"));
const rest_1 = require("./rest");
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
            if (this.options.networkType === 'production') {
                return 'https://worker.asteroid.moonlight.io';
            }
            if (this.options.networkType === 'stage') {
                return 'https://stage-worker.asteroid.moonlight.io';
            }
        }
        throw new Error('Unable to determine baseUrl.');
    }
    get rpcUrl() {
        return build_url_1.default(this.baseUrl, {
            path: '/rpc',
        });
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