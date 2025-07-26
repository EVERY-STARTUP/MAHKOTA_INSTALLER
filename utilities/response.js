"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
const configs_1 = require("../configs");
exports.ResponseData = {
    error: (message) => {
        return {
            requestParam: null,
            status: 'error',
            errorMessage: message,
            data: null,
            next: null,
            version: { code: configs_1.APP_CONFIGS.appVersion, name: configs_1.APP_CONFIGS.appSemantic }
        };
    },
    success: (data = null, next = null) => {
        return {
            requestParam: null,
            status: 'success',
            errorMessage: null,
            data,
            next,
            version: { code: configs_1.APP_CONFIGS.appVersion, name: configs_1.APP_CONFIGS.appSemantic }
        };
    }
};
