"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const reportModel_1 = require("../../models/reportModel"); // Import Report model
const reportSchema_1 = require("../../schemas/reportSchema"); // Import deleteReport schema
const logger_1 = __importDefault(require("../../utilities/logger"));
const remove = async (req, res) => {
    // Validasi request parameters untuk reportId
    const { error, value } = (0, validateRequest_1.validateRequest)(reportSchema_1.deleteReportSchema, req.params);
    if (error) {
        const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        // Mencari Report berdasarkan reportId
        const result = await reportModel_1.ReportModel.findOne({
            where: {
                reportId: value.reportId
            }
        });
        if (!result) {
            const message = `Report not found with ID: ${value.reportId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        // Menghapus report
        await result.destroy();
        // Mengirimkan response sukses
        const response = response_1.ResponseData.success({
            message: 'Report deleted successfully'
        });
        logger_1.default.info('Report deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.remove = remove;
