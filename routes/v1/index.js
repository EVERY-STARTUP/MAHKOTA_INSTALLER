"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouterV1 = void 0;
const controllers_1 = require("../../controllers");
const userRouter_1 = __importDefault(require("./userRouter"));
const productRouter_1 = __importDefault(require("./productRouter"));
const saleRouter_1 = __importDefault(require("./saleRouter"));
const platformRouter_1 = __importDefault(require("./platformRouter"));
const companyRouter_1 = __importDefault(require("./companyRouter"));
const statisticRouter_1 = __importDefault(require("./statisticRouter"));
const reportRouter_1 = __importDefault(require("./reportRouter"));
const settingRouter_1 = __importDefault(require("./settingRouter"));
const uploadFileRouter_1 = __importDefault(require("./uploadFileRouter"));
const appRouterV1 = (app) => {
    app.get(`/api/v1`, async (req, res) => await (0, controllers_1.index)(req, res));
    app.use(`/api/v1/users`, userRouter_1.default);
    app.use(`/api/v1/files`, uploadFileRouter_1.default);
    app.use(`/api/v1/products`, productRouter_1.default);
    app.use(`/api/v1/sales`, saleRouter_1.default);
    app.use(`/api/v1/platforms`, platformRouter_1.default);
    app.use(`/api/v1/companies`, companyRouter_1.default);
    app.use(`/api/v1/statistic`, statisticRouter_1.default);
    app.use(`/api/v1/reports`, reportRouter_1.default);
    app.use(`/api/v1/settings`, settingRouter_1.default);
};
exports.appRouterV1 = appRouterV1;
