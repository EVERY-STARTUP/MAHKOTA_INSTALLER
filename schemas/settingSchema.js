"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllSettingSchema = exports.findOneSettingSchema = exports.deleteSettingSchema = exports.updateSettingSchema = exports.createSettingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Schema for creating a new setting
exports.createSettingSchema = joi_1.default.object({
    settingWhatsappNumber: joi_1.default.string().max(255).required(),
    settingBanners: joi_1.default.string().optional(),
    settingAffiliatePercentage: joi_1.default.number().precision(2).min(0).optional(),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional()
});
// Schema for updating an existing setting
exports.updateSettingSchema = joi_1.default.object({
    settingId: joi_1.default.number().integer().positive().required(),
    settingWhatsappNumber: joi_1.default.string().max(255).optional(),
    settingBanners: joi_1.default.string().optional(),
    settingAffiliatePercentage: joi_1.default.number().precision(2).min(0).optional(),
    updatedAt: joi_1.default.date().optional()
});
// Schema for deleting a setting
exports.deleteSettingSchema = joi_1.default.object({
    settingId: joi_1.default.number().integer().positive().required()
});
// Schema for fetching a single setting
exports.findOneSettingSchema = joi_1.default.object({
    settingId: joi_1.default.number().integer().positive().required()
});
// Schema for fetching all settings with pagination and search support
exports.findAllSettingSchema = joi_1.default.object({
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional()
});
