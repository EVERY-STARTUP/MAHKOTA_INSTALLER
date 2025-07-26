"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllReportsSchema = exports.findOneReportSchema = exports.deleteReportSchema = exports.updateReportSchema = exports.createReportSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Schema for creating a new Report
exports.createReportSchema = joi_1.default.object({
    reportName: joi_1.default.string().max(255).required(),
    reportTotalAmount: joi_1.default.number().precision(2).required(), // Ensuring decimal support
    reportDescription: joi_1.default.string().allow('').optional(), // Optional and allows empty
    reportCategory: joi_1.default.string().valid('income', 'spend').required()
});
// Schema for updating an existing Report
exports.updateReportSchema = joi_1.default.object({
    reportId: joi_1.default.number().integer().positive().required(),
    reportName: joi_1.default.string().max(255).optional(),
    reportTotalAmount: joi_1.default.number().precision(2).optional(),
    reportDescription: joi_1.default.string().allow('').optional(),
    reportCategory: joi_1.default.string().valid('income', 'spend').required(),
    updatedAt: joi_1.default.date().optional()
});
// Schema for deleting a Report
exports.deleteReportSchema = joi_1.default.object({
    reportId: joi_1.default.number().integer().positive().required()
});
// Schema for fetching a single Report
exports.findOneReportSchema = joi_1.default.object({
    reportId: joi_1.default.number().integer().positive().required()
});
// Schema for fetching all Reports with pagination and search support
exports.findAllReportsSchema = joi_1.default.object({
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
