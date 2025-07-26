"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findReportTotals = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const reportModel_1 = require("../../models/reportModel");
const logger_1 = __importDefault(require("../../utilities/logger"));
const response_1 = require("../../utilities/response");
const validateRequest_1 = require("../../utilities/validateRequest");
const statisticSchema_1 = require("../../schemas/statisticSchema");
// Helper function to calculate date ranges
const getDateRange = (filterType) => {
    const now = new Date();
    let startDate;
    let endDate = new Date();
    switch (filterType) {
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
const findReportTotals = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(statisticSchema_1.findStatisticSchema, req.query);
    if (error) {
        const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const { page: queryPage, size: querySize, search, pagination, filterType, startDate, endDate } = value;
        // Calculate date range based on filterType
        const { startDate: filterStartDate, endDate: filterEndDate } = getDateRange(filterType ?? '');
        const dateFilter = filterType
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
        const [totalIncome, totalSpend] = await Promise.all([
            reportModel_1.ReportModel.sum('reportTotalAmount', {
                where: {
                    reportCategory: 'income',
                    ...dateFilter,
                    ...(Boolean(search) && {
                        reportName: { [sequelize_1.Op.like]: `%${search}%` }
                    })
                }
            }),
            reportModel_1.ReportModel.sum('reportTotalAmount', {
                where: {
                    reportCategory: 'spend',
                    ...dateFilter,
                    ...(Boolean(search) && {
                        reportName: { [sequelize_1.Op.like]: `%${search}%` }
                    })
                }
            })
        ]);
        const totalSaldo = (totalIncome || 0) - (totalSpend || 0);
        const response = response_1.ResponseData.success({
            totalIncome: totalIncome || 0,
            totalSpend: totalSpend || 0,
            totalSaldo
        });
        logger_1.default.info('Report totals retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findReportTotals = findReportTotals;
