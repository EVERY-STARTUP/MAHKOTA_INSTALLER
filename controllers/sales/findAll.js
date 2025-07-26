"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllSales = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const saleModel_1 = require("../../models/saleModel");
const saleSchema_1 = require("../../schemas/saleSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const saleItemModel_1 = require("../../models/saleItemModel");
const sequelize_1 = require("sequelize");
const pagination_1 = require("../../utilities/pagination");
const findAllSales = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(saleSchema_1.findAllSaleSchema, req.query);
    if (error) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, search, pagination, salePlatformName, saleOrderStatus, startDate, endDate } = value;
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        const dateFilter = startDate && endDate
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
            : {};
        const result = await saleModel_1.SaleModel.findAndCountAll({
            where: {
                deleted: 0,
                ...(Boolean(salePlatformName) && {
                    salePlatformName: salePlatformName
                }),
                ...(Boolean(saleOrderStatus) && {
                    saleOrderStatus: saleOrderStatus
                }),
                ...(Boolean(search) && {
                    [sequelize_1.Op.or]: [{ salePaymentMethod: { [sequelize_1.Op.like]: `%${search}%` } }]
                }),
                ...dateFilter
            },
            distinct: true,
            include: [
                {
                    model: saleItemModel_1.SaleItemModel,
                    as: 'saleItems',
                    attributes: [
                        'createdAt',
                        'saleItemId',
                        'saleId',
                        'saleItemQuantity',
                        'saleItemPrice',
                        'saleItemSubtotal',
                        'saleItemProductName',
                        'saleItemProductCode'
                    ]
                }
            ],
            order: [['saleId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success(page.formatData(result));
        logger_1.default.info('Sales retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAllSales = findAllSales;
