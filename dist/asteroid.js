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
const request_promise_1 = __importDefault(require("request-promise"));
const node_log_it_1 = require("node-log-it");
const MODULE_NAME = 'Asteroid';
const DEFAULT_OPTIONS = {
    baseUrl: 'https://stage-user.asteroid.moonlight.io',
    loggerOptions: {},
};
class Asteroid {
    constructor(options = {}) {
        this.options = lodash_1.merge({}, DEFAULT_OPTIONS, options);
        this.validateOptionalParameters();
        this.logger = new node_log_it_1.Logger(MODULE_NAME, this.options.loggerOptions);
    }
    greet(name = 'World') {
        return `Hello, ${name}`;
    }
    sum(a, b) {
        return a + b;
    }
    getAsteroidUserVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'https://stage-user.asteroid.moonlight.io/version';
            const opt = {
                uri: url,
                json: true,
            };
            const res = yield request_promise_1.default(opt);
            return res.version;
        });
    }
    validateOptionalParameters() {
    }
}
exports.Asteroid = Asteroid;
//# sourceMappingURL=asteroid.js.map