"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const companyModel_1 = require("../../models/companyModel");
const companySchema_1 = require("../../schemas/companySchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const remove = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(companySchema_1.deleteCompanySchema, req.params);
    if (error) {
        const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await companyModel_1.CompanyModel.findOne({
            where: {
                companyId: value.companyId
            }
        });
        if (!result) {
            const message = `Company not found with ID: ${value.companyId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        await result.destroy();
        const response = response_1.ResponseData.success({
            message: 'Company deleted successfully'
        });
        logger_1.default.info('Company deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.remove = remove;
