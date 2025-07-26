"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const access_1 = require("./access");
const upload_file_1 = require("./upload-file");
exports.middleware = { useAuthorization: access_1.useAuthorization, uploadMiddleware: upload_file_1.uploadMiddleware };
