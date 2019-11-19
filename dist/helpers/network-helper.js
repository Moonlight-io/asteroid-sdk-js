"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NetworkHelper {
    static getAsteroidDomainUserBaseUrl(networkType) {
        if (networkType === 'production') {
            return 'https://user.asteroid.moonlight.io';
        }
        if (networkType === 'stage') {
            return 'https://stage-user.asteroid.moonlight.io';
        }
        throw new Error(`Unknown networkType: [${networkType}]`);
    }
    static getAsteroidDomainWorkerBaseUrl(networkType) {
        if (networkType === 'production') {
            return 'https://worker.asteroid.moonlight.io';
        }
        if (networkType === 'stage') {
            return 'https://stage-worker.asteroid.moonlight.io';
        }
        throw new Error(`Unknown networkType: [${networkType}]`);
    }
}
exports.NetworkHelper = NetworkHelper;
//# sourceMappingURL=network-helper.js.map