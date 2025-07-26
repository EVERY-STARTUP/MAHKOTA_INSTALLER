"use strict";
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
const configs_1 = require("../configs");
function hashPassword(password) {
    return require('crypto')
        .createHash('sha1')
        .update(password + configs_1.APP_CONFIGS.secret.passwordEncryption)
        .digest('hex');
}
