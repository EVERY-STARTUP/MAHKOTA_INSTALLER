"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPlatformSchema = exports.findOnePlatformSchema = exports.deletePlatformSchema = exports.updatePlatformSchema = exports.createPlatformSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Schema for creating a new platform
exports.createPlatformSchema = joi_1.default.object({
    platformName: joi_1.default.string().max(255).required(),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional()
});
// Schema for updating an existing platform
exports.updatePlatformSchema = joi_1.default.object({
    platformId: joi_1.default.number().integer().positive().required(),
    platformName: joi_1.default.string().max(255).optional(),
    updatedAt: joi_1.default.date().optional()
});
// Schema for deleting an platform
exports.deletePlatformSchema = joi_1.default.object({
    platformId: joi_1.default.number().integer().positive().required()
});
// Schema for fetching a single platform
exports.findOnePlatformSchema = joi_1.default.object({
    platformId: joi_1.default.number().integer().positive().required()
});
// Schema for fetching all OrderCategories with pagination and search support
exports.findAllPlatformSchema = joi_1.default.object({
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
