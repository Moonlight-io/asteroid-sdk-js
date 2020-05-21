"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var NumberHelper = /** @class */ (function () {
    function NumberHelper() {
    }
    NumberHelper.getBigIntFromHexString = function (hexVal) {
        var bn = new bignumber_js_1.default(hexVal);
        return 0;
    };
    return NumberHelper;
}());
exports.NumberHelper = NumberHelper;
//# sourceMappingURL=number-helper.js.map