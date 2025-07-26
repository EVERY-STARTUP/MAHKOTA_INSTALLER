"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const reportModel_1 = require("../../models/reportModel"); // Import Report model
const reportSchema_1 = require("../../schemas/reportSchema"); // Import findAllReports schema
const logger_1 = __importDefault(require("../../utilities/logger"));
const pagination_1 = require("../../utilities/pagination");
const sequelize_1 = require("sequelize");
const findAll = async (req, res) => {
    // Validate the incoming query parameters using the Joi schema
    const { error, value } = (0, validateRequest_1.validateRequest)(reportSchema_1.findAllReportsSchema, req.query);
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
        const result = await reportModel_1.ReportModel.findAndCountAll({
            where: {
                ...(Boolean(search) && {
                    reportName: { [sequelize_1.Op.like]: `%${search}%` }
                }),
                ...dateFilter
            },
            order: [['reportId', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        // Prepare the response data
        const response = response_1.ResponseData.success(result);
        response.data = page.formatData(result); // Format data for pagination
        logger_1.default.info('Reports retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response); // Return successful response
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.findAll = findAll;
