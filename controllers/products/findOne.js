"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const productModel_1 = require("../../models/productModel");
const productSchema_1 = require("../../schemas/productSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const productVariantModel_1 = require("../../models/productVariantModel");
const findProduct = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(productSchema_1.findOneProductSchema, req.params);
    if (error) {
        const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await productModel_1.ProductModel.findOne({
            where: {
                deleted: 0,
                productId: value.productId
            },
            include: [
                {
                    model: productVariantModel_1.ProductVariantModel,
                    as: 'variants',
                    attributes: [
                        'variantId',
                        'productId',
                        'variantName',
                        'variantPrice',
                        'variantSize',
                        'variantColor',
                        'variantCategory',
                        'variantImage'
                    ]
                }
            ]
        });
        if (!result) {
            const message = `Product not found with ID: ${value.productId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const response = response_1.ResponseData.success(result);
        logger_1.default.info('Product found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findProduct = findProduct;
