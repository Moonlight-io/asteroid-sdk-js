"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkHelper = void 0;
var urls_1 = require("../constants/urls");
var NetworkHelper = /** @class */ (function () {
    function NetworkHelper() {
    }
    NetworkHelper.getAsteroidDomainUserBaseUrl = function (networkType) {
        if (networkType === 'production') {
            return urls_1.urls.asteroidDomainUser.baseUrl.production;
        }
        if (networkType === 'stage') {
            return urls_1.urls.asteroidDomainUser.baseUrl.stage;
        }
        if (networkType === 'dev') {
            return urls_1.urls.asteroidDomainUser.baseUrl.dev;
        }
        if (networkType === 'docker') {
            return urls_1.urls.asteroidDomainUser.baseUrl.docker;
        }
        throw new Error("Unknown networkType: [" + networkType + "]");
    };
    NetworkHelper.getAsteroidDomainWorkerBaseUrl = function (networkType) {
        if (networkType === 'production') {
            return urls_1.urls.asteroidDomainWorker.baseUrl.production;
        }
        if (networkType === 'stage') {
            return urls_1.urls.asteroidDomainWorker.baseUrl.stage;
        }
        if (networkType === 'dev') {
            return urls_1.urls.asteroidDomainWorker.baseUrl.dev;
        }
        if (networkType === 'docker') {
            return urls_1.urls.asteroidDomainWorker.baseUrl.docker;
        }
        throw new Error("Unknown networkType: [" + networkType + "]");
    };
    NetworkHelper.getNeo2Network = function (networkType) {
        if (networkType == 'production') {
            return urls_1.urls.blockchainNeo2.baseURL.production;
        }
        throw new Error("Unknown networkType: [" + networkType);
    };
    return NetworkHelper;
}());
exports.NetworkHelper = NetworkHelper;
//# sourceMappingURL=network-helper.js.map