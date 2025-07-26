"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChart = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const saleItemModel_1 = require("../../models/saleItemModel");
const productModel_1 = require("../../models/productModel");
const saleModel_1 = require("../../models/saleModel");
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const validateRequest_1 = require("../../utilities/validateRequest");
const statisticSchema_1 = require("../../schemas/statisticSchema");
// Helper function to calculate date ranges
const getDateRange = (filterByDayWeekMonthYear) => {
    const now = new Date();
    let startDate;
    let endDate = new Date();
    switch (filterByDayWeekMonthYear) {
        case 'day':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case 'week':
            startDate = new Date(now);
            startDate.setDate(now.getDate() - now.getDay()); // Start of the week (Sunday)
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the month
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1); // Start of the year
            break;
        default:
            startDate = new Date(0); // Default: all data
    }
    return { startDate, endDate };
};
const findChart = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(statisticSchema_1.findStatisticSchema, req.query);
    if (error) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, search, pagination, filterByPlatform, startDate, endDate, filterByDayWeekMonthYear } = value;
        const page = new pagination_1.Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10);
        const { startDate: filterStartDate, endDate: filterEndDate } = getDateRange(filterByDayWeekMonthYear ?? '');
        const dateFilter = filterByDayWeekMonthYear
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [filterStartDate, filterEndDate]
                }
            }
            : startDate && endDate
                ? {
                    createdAt: {
                        [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                    }
                }
                : {};
        const result = await saleModel_1.SaleModel.findAndCountAll({
            where: {
                deleted: 0,
                ...(Boolean(filterByPlatform) && {
                    salePlatformName: filterByPlatform
                }),
                ...(Boolean(search) && {
                    [sequelize_1.Op.or]: [{ salePaymentMethod: { [sequelize_1.Op.like]: `%${search}%` } }]
                }),
                ...dateFilter
            },
            include: [
                {
                    model: saleItemModel_1.SaleItemModel,
                    as: 'saleItems',
                    attributes: [
                        'createdAt',
                        'saleItemQuantity',
                        'saleItemPrice',
                        'saleItemSubtotal'
                    ],
                    include: [
                        {
                            model: productModel_1.ProductModel,
                            as: 'product',
                            attributes: ['productName']
                        }
                    ]
                }
            ],
            attributes: ['createdAt', 'saleFinalPrice', 'salePlatformName'],
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
exports.findChart = findChart;
