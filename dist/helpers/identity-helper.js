"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var neon_js_1 = require("@cityofzion/neon-js");
var IdentityHelper = /** @class */ (function () {
    function IdentityHelper() {
    }
    IdentityHelper.parseKey = function (response) {
        if (response.result.stack.length > 0 && response.result.stack[0].value.length > 0) {
            var deleted = response.result.stack[0].value[8].value === '1';
            if (deleted) {
                return {
                    deleted: deleted,
                    pointer: parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value[9].value), 16),
                };
            }
            else {
                return {
                    holder: response.result.stack[0].value[0].value,
                    owner: response.result.stack[0].value[1].value,
                    iss: response.result.stack[0].value[2].value,
                    sub: neon_js_1.u.hexstring2str(response.result.stack[0].value[3].value),
                    type: neon_js_1.u.hexstring2str(response.result.stack[0].value[4].value),
                    payload: neon_js_1.u.hexstring2str(response.result.stack[0].value[5].value),
                    signature: response.result.stack[0].value[6].value,
                    encryption: neon_js_1.u.hexstring2str(response.result.stack[0].value[7].value),
                    deleted: deleted,
                    pointer: parseInt(neon_js_1.u.reverseHex(response.result.stack[0].value[9].value), 16),
                };
            }
        }
    };
    return IdentityHelper;
}());
exports.IdentityHelper = IdentityHelper;
//# sourceMappingURL=identity-helper.js.map