"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const user_1 = require("./user");
const worker_1 = require("./worker");
const rpc = {
    invoke: base_1.invoke,
    user: user_1.AsteroidUserRpc,
    worker: worker_1.AsteroidWorkerRpc,
};
exports.rpc = rpc;
//# sourceMappingURL=index.js.map