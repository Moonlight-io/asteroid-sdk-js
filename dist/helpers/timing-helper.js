"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimingHelper = /** @class */ (function () {
    function TimingHelper() {
    }
    TimingHelper.sleep = function (ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, ms);
        });
    };
    return TimingHelper;
}());
exports.TimingHelper = TimingHelper;
//# sourceMappingURL=timing-helper.js.map