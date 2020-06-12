"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpc = void 0;
var base_1 = require("./base");
var user_1 = require("./user");
var worker_1 = require("./worker");
var rpc = {
    invoke: base_1.invoke,
    user: user_1.AsteroidUserRpc,
    worker: worker_1.AsteroidWorkerRpc,
};
exports.rpc = rpc;
//# sourceMappingURL=index.js.map