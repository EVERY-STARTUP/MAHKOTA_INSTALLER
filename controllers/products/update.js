"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const productModel_1 = require("../../models/productModel");
const productVariantModel_1 = require("../../models/productVariantModel");
const productSchema_1 = require("../../schemas/productSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const updateProduct = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(productSchema_1.updateProductSchema, req.body);
    if (error) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { productId, variants, ...productData } = value;
        // Update the main product details
        const [updated] = await productModel_1.ProductModel.update(productData, {
            where: { deleted: 0, productId }
        });
        if (!updated) {
            const message = `Product not found with ID: ${productId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        // Handle variants if provided
        if (variants && Array.isArray(variants)) {
            const existingVariants = await productVariantModel_1.ProductVariantModel.findAll({
                where: { productId }
            });
            // Delete variants not included in the update
            const variantIdsToKeep = variants.map((v) => v.variantId).filter(Boolean);
            await productVariantModel_1.ProductVariantModel.destroy({
                where: {
                    productId,
                    variantId: { $notIn: variantIdsToKeep }
                }
            });
            // Update or create variants
            for (const variant of variants) {
                if (variant.variantId) {
                    // Update existing variant
                    await productVariantModel_1.ProductVariantModel.update(variant, {
                        where: { variantId: variant.variantId }
                    });
                }
                else {
                    // Create new variant
                    await productVariantModel_1.ProductVariantModel.create({ ...variant, productId });
                }
            }
        }
        const response = response_1.ResponseData.success({ message: 'Product updated successfully' });
        logger_1.default.info('Product updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.updateProduct = updateProduct;
