"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStatisticSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.findStatisticSchema = joi_1.default.object({
    page: joi_1.default.number().integer().default(0),
    size: joi_1.default.number().integer().default(10),
    search: joi_1.default.string().allow('').optional(),
    filterByPlatform: joi_1.default.string().allow('').optional(),
    filterByDayWeekMonthYear: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().allow('').optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
