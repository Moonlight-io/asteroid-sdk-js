"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const json_rpc_error_1 = __importDefault(require("json-rpc-error"));
const invoke = (rpcUrl, method, params, id, methodVersion, config) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        jsonrpc: '2.0',
        id,
        method,
        params: Object.assign({ version: methodVersion }, params),
    };
    const res = yield axios_1.default.post(rpcUrl, payload, config);
    if (res.data.error) {
        throw new json_rpc_error_1.default(res.data.error.message, res.data.error.code);
    }
    return res.data.result;
});
exports.invoke = invoke;
//# sourceMappingURL=base.js.map