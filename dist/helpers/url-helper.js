"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlHelper = void 0;
var BuildUrl = require("build-url");
var UrlHelper = /** @class */ (function () {
    function UrlHelper() {
    }
    UrlHelper.getRpcUrl = function (baseUrl) {
        return BuildUrl(baseUrl, {
            path: '/rpc',
        });
    };
    UrlHelper.getVersionUrl = function (baseUrl) {
        return BuildUrl(baseUrl, {
            path: '/version',
        });
    };
    return UrlHelper;
}());
exports.UrlHelper = UrlHelper;
//# sourceMappingURL=url-helper.js.map