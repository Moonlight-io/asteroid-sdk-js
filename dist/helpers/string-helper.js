"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringHelper = /** @class */ (function () {
    function StringHelper() {
    }
    StringHelper.HexToAscii = function (hexVal) {
        var hex = hexVal.toString();
        var output = '';
        for (var n = 0; n < hex.length; n += 2) {
            output += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return output;
    };
    return StringHelper;
}());
exports.StringHelper = StringHelper;
//# sourceMappingURL=string-helper.js.map