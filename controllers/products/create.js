"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const productModel_1 = require("../../models/productModel");
const productVariantModel_1 = require("../../models/productVariantModel");
const productSchema_1 = require("../../schemas/productSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const generateId_1 = require("../../utilities/generateId");
const createProduct = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(productSchema_1.createProductSchema, req.body);
    if (error) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        value['productCode'] = (0, generateId_1.generateUniqueId)();
        const { variants, ...productData } = value;
        const product = await productModel_1.ProductModel.create(productData);
        if (variants && Array.isArray(variants)) {
            const variantRecords = variants.map((variant) => ({
                ...variant,
                productId: product.productId
            }));
            await productVariantModel_1.ProductVariantModel.bulkCreate(variantRecords);
        }
        const response = response_1.ResponseData.success(product);
        logger_1.default.info('Product created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.createProduct = createProduct;
