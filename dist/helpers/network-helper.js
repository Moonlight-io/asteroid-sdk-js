"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urls_1 = require("../constants/urls");
class NetworkHelper {
    static getAsteroidDomainUserBaseUrl(networkType) {
        if (networkType === 'production') {
            return urls_1.urls.asteroidDomainUser.baseUrl.production;
        }
        if (networkType === 'stage') {
            return urls_1.urls.asteroidDomainUser.baseUrl.stage;
        }
        throw new Error(`Unknown networkType: [${networkType}]`);
    }
    static getAsteroidDomainWorkerBaseUrl(networkType) {
        if (networkType === 'production') {
            return urls_1.urls.asteroidDomainWorker.baseUrl.production;
        }
        if (networkType === 'stage') {
            return urls_1.urls.asteroidDomainWorker.baseUrl.production;
        }
        throw new Error(`Unknown networkType: [${networkType}]`);
    }
}
exports.NetworkHelper = NetworkHelper;
//# sourceMappingURL=network-helper.js.map