"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTotal = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const sequelize_1 = require("sequelize");
const user_1 = require("../../models/user");
const saleModel_1 = require("../../models/saleModel");
const saleItemModel_1 = require("../../models/saleItemModel");
const productModel_1 = require("../../models/productModel");
const companyModel_1 = require("../../models/companyModel");
const platformModel_1 = require("../../models/platformModel");
const logger_1 = __importDefault(require("../../utilities/logger"));
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
            startDate.setDate(now.getDate() - now.getDay());
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        default:
            startDate = new Date(0);
    }
    return { startDate, endDate };
};
const findTotal = async (req, res) => {
    try {
        const { filterByPlatform, startDate, endDate, filterByDayWeekMonthYear } = req.query;
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
        const platformFilter = filterByPlatform
            ? {
                salePlatformName: filterByPlatform
            }
            : {};
        const totalTransaction = await saleModel_1.SaleModel.count({
            where: {
                saleOrderStatus: 'done',
                deleted: 0,
                ...dateFilter,
                ...platformFilter
            }
        });
        const totalItemSales = await saleItemModel_1.SaleItemModel.count({
            where: {
                deleted: 0,
                ...dateFilter
            }
        });
        const totalSuperAdmin = await user_1.UserModel.count({
            where: {
                deleted: 0,
                userRole: 'superAdmin',
                ...dateFilter
            }
        });
        const totalAdmin = await user_1.UserModel.count({
            where: {
                deleted: 0,
                userRole: 'admin',
                ...dateFilter
            }
        });
        const totalUser = await user_1.UserModel.count({
            where: {
                deleted: 0,
                userRole: 'user',
                ...dateFilter
            }
        });
        const totalProduct = await productModel_1.ProductModel.count({
            where: {
                deleted: 0
                // ...dateFilter
            }
        });
        const totalPerusahaan = await companyModel_1.CompanyModel.count({
            where: {
                deleted: 0
                // ...dateFilter
            }
        });
        const totalPlatform = await platformModel_1.PlatformModel.count({
            where: {
                deleted: 0
                // ...dateFilter
            }
        });
        const response = response_1.ResponseData.success({
            totalTransaction,
            totalItemSales,
            totalSuperAdmin,
            totalAdmin,
            totalUser,
            totalProduct,
            totalPerusahaan,
            totalPlatform
        });
        logger_1.default.info('Total statistics retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findTotal = findTotal;
