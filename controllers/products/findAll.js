"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllProducts = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const productModel_1 = require("../../models/productModel");
const productSchema_1 = require("../../schemas/productSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const sequelize_1 = require("sequelize");
const productVariantModel_1 = require("../../models/productVariantModel");
const findAllProducts = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(productSchema_1.findAllProductsSchema, req.query);
    if (error) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, search, pagination, startDate, endDate } = value;
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        const dateFilter = startDate && endDate
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
            : {};
        const result = await productModel_1.ProductModel.findAndCountAll({
            where: {
                deleted: 0,
                ...(Boolean(req.query.search) && {
                    [sequelize_1.Op.or]: [{ productName: { [sequelize_1.Op.like]: `%${search}%` } }]
                }),
                ...dateFilter
            },
            distinct: true,
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
            ],
            order: [['productId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(result);
        response.data = page.formatData(result);
        logger_1.default.info('Products retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllProducts = findAllProducts;
