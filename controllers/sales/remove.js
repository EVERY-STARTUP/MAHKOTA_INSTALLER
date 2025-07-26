"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSale = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const saleModel_1 = require("../../models/saleModel");
const saleSchema_1 = require("../../schemas/saleSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const removeSale = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(saleSchema_1.deleteSaleSchema, req.params);
    if (error) {
        const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const result = await saleModel_1.SaleModel.findOne({
            where: {
                deleted: 0,
                saleId: value.saleId
            }
        });
        if (!result) {
            const message = `Sale not found with ID: ${value.saleId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        result.deleted = 1;
        void result.save();
        const response = response_1.ResponseData.success({ message: 'Sale deleted successfully' });
        logger_1.default.info('Sale deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.removeSale = removeSale;
