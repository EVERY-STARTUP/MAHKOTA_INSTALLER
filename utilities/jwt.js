"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, configs_1.APP_CONFIGS.secret.token ?? '');
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, configs_1.APP_CONFIGS.secret.token ?? '');
    }
    catch {
        return false;
    }
};
exports.verifyAccessToken = verifyAccessToken;
