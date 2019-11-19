"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildUrl = require("build-url");
class UrlHelper {
    static getRpcUrl(baseUrl) {
        return BuildUrl(baseUrl, {
            path: '/rpc',
        });
    }
    static getVersionUrl(baseUrl) {
        return BuildUrl(baseUrl, {
            path: '/version',
        });
    }
}
exports.UrlHelper = UrlHelper;
//# sourceMappingURL=url-helper.js.map