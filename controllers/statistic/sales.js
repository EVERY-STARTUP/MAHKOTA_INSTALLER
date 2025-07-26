"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesStatistics = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const saleModel_1 = require("../../models/saleModel");
const saleItemModel_1 = require("../../models/saleItemModel");
const productModel_1 = require("../../models/productModel");
const logger_1 = __importDefault(require("../../utilities/logger"));
const validateRequest_1 = require("../../utilities/validateRequest");
const statisticSchema_1 = require("../../schemas/statisticSchema");
const response_1 = require("../../utilities/response");
// Helper function for calculating date ranges
const getDateRange = (filter) => {
    const now = new Date();
    let startDate;
    let endDate = new Date();
    switch (filter) {
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
            startDate = new Date(0); // All data by default
    }
    return { startDate, endDate };
};
const getSalesStatistics = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(statisticSchema_1.findStatisticSchema, req.query);
    if (error) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message });
    }
    try {
        const { filterByPlatform, startDate, endDate, filterByDayWeekMonthYear } = value;
        // Determine date filters
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
        const sales = await saleModel_1.SaleModel.findAll({
            where: {
                deleted: 0,
                saleOrderStatus: 'done',
                ...(filterByPlatform && { salePlatformName: filterByPlatform }),
                ...dateFilter
            },
            include: [
                {
                    model: saleItemModel_1.SaleItemModel,
                    as: 'saleItems',
                    include: [
                        {
                            model: productModel_1.ProductModel,
                            as: 'product'
                        }
                    ]
                }
            ],
            attributes: ['saleFinalPrice', 'createdAt']
        });
        if (!sales) {
            const message = `Report not found with ID: ${value.reportId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        // Aggregate totals
        const totalItems = sales.reduce((sum, sale) => {
            const itemTotal = sale?.saleItems?.reduce((itemSum, item) => itemSum + (item.saleItemQuantity || 0), 0);
            return sum + itemTotal;
        }, 0);
        const totalAmount = sales.reduce((sum, sale) => sum + parseFloat(sale.saleFinalPrice + '' || '0'), 0);
        const response = {
            totalItems,
            totalAmount,
            sales: sales.flatMap((sale) => sale.saleItems || [])
        };
        logger_1.default.info('Sales statistics retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: response });
    }
    catch (err) {
        const message = `Unable to process request! Error: ${err.message}`;
        logger_1.default.error(message, { stack: err.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message });
    }
};
exports.getSalesStatistics = getSalesStatistics;
