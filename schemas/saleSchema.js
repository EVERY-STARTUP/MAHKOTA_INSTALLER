"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSaleSchema = exports.findOneSaleSchema = exports.updateSaleSchema = exports.createSaleSchema = exports.findAllSaleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.findAllSaleSchema = joi_1.default.object({
    page: joi_1.default.number().integer().default(0),
    size: joi_1.default.number().integer().default(10),
    search: joi_1.default.string().allow('').optional(),
    salePlatformName: joi_1.default.string().allow('').optional(),
    saleOrderStatus: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().allow('').optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
exports.createSaleSchema = joi_1.default.object({
    saleTotalPrice: joi_1.default.number().positive().required(),
    saleFinalPrice: joi_1.default.number().positive().required(),
    saleTax: joi_1.default.number().optional(),
    saleDiscount: joi_1.default.number().optional(),
    saleDeliveryCost: joi_1.default.number().optional(),
    salePaymentMethod: joi_1.default.string().required(),
    salePlatformName: joi_1.default.string().required(),
    saleDeliverCompanyName: joi_1.default.string().required(),
    saleDeliverCompanyAddress: joi_1.default.string().required(),
    salePo: joi_1.default.string().optional().allow(''),
    saleItems: joi_1.default.array()
        .items(joi_1.default.object({
        productId: joi_1.default.number().integer().positive().optional(),
        saleItemProductName: joi_1.default.string().required(),
        saleItemProductCode: joi_1.default.string().required(),
        saleItemQuantity: joi_1.default.number().integer().positive().required(),
        saleItemPrice: joi_1.default.number().positive().required(),
        saleItemSubtotal: joi_1.default.number().positive().required()
    }))
        .required()
});
exports.updateSaleSchema = joi_1.default.object({
    saleId: joi_1.default.number().integer().positive().required(),
    saleTotalPrice: joi_1.default.number().positive().optional(),
    saleTax: joi_1.default.number().positive().optional(),
    saleDiscount: joi_1.default.number().positive().optional(),
    saleDeliveryCost: joi_1.default.number().positive().optional(),
    salePaymentMethod: joi_1.default.string().optional(),
    salePlatformName: joi_1.default.string().optional(),
    saleDeliverCompanyName: joi_1.default.string().optional(),
    saleOrderStatus: joi_1.default.string()
        .valid('waiting', 'process', 'cancel', 'done')
        .optional()
        .allow(''),
    saleDeliverCompanyAddress: joi_1.default.string().optional(),
    saleItems: joi_1.default.array()
        .items(joi_1.default.object({
        productId: joi_1.default.number().integer().positive().optional(),
        saleItemProductName: joi_1.default.string().required(),
        saleItemProductCode: joi_1.default.string().required(),
        saleItemQuantity: joi_1.default.number().integer().positive().optional(),
        saleItemPrice: joi_1.default.number().positive().optional(),
        saleItemSubtotal: joi_1.default.number().positive().optional()
    }))
        .optional()
});
exports.findOneSaleSchema = joi_1.default.object({
    saleId: joi_1.default.number().integer().positive().required()
});
exports.deleteSaleSchema = joi_1.default.object({
    saleId: joi_1.default.number().integer().positive().required()
});
