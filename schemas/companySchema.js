"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllCompaniesSchema = exports.findOneCompanySchema = exports.deleteCompanySchema = exports.updateCompanySchema = exports.createCompanySchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Schema for creating a new Company
exports.createCompanySchema = joi_1.default.object({
    companyName: joi_1.default.string().max(255).required(),
    companyAddress: joi_1.default.string().required(),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional()
});
// Schema for updating an existing Company
exports.updateCompanySchema = joi_1.default.object({
    companyId: joi_1.default.number().integer().positive().required(),
    companyName: joi_1.default.string().max(255).optional(),
    companyAddress: joi_1.default.string().optional(),
    updatedAt: joi_1.default.date().optional()
});
// Schema for deleting an Company
exports.deleteCompanySchema = joi_1.default.object({
    companyId: joi_1.default.number().integer().positive().required()
});
// Schema for fetching a single Company
exports.findOneCompanySchema = joi_1.default.object({
    companyId: joi_1.default.number().integer().positive().required()
});
// Schema for fetching all OrderCategories with pagination and search support
exports.findAllCompaniesSchema = joi_1.default.object({
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
