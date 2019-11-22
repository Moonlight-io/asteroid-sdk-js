"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var urls_1 = require("../constants/urls");
var NetworkHelper = (function () {
    function NetworkHelper() {
    }
    NetworkHelper.getAsteroidDomainUserBaseUrl = function (networkType) {
        if (networkType === 'production') {
            return urls_1.urls.asteroidDomainUser.baseUrl.production;
        }
        if (networkType === 'stage') {
            return urls_1.urls.asteroidDomainUser.baseUrl.stage;
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
        throw new Error("Unknown networkType: [" + networkType + "]");
    };
    return NetworkHelper;
}());
exports.NetworkHelper = NetworkHelper;
//# sourceMappingURL=network-helper.js.map