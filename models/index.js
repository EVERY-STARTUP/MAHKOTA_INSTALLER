"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const configs_1 = require("../configs");
dotenv_1.default.config();
const dataBaseConfig = configs_1.APP_CONFIGS.dataBase.development;
exports.sequelize = new sequelize_1.Sequelize(dataBaseConfig);
