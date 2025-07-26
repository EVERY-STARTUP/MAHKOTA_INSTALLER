"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSale = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const saleModel_1 = require("../../models/saleModel");
const saleSchema_1 = require("../../schemas/saleSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const reportModel_1 = require("../../models/reportModel");
// import { SaleItemModel } from '../../models/saleItemModel'
const updateSale = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(saleSchema_1.updateSaleSchema, req.body);
    if (error) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const [updated] = await saleModel_1.SaleModel.update(value, {
            where: { deleted: 0, saleId: value.saleId }
        });
        const saleResult = await saleModel_1.SaleModel.findOne({
            where: { saleId: value.saleId }
        });
        if (value?.saleOrderStatus && value.saleOrderStatus === 'done') {
            if (saleResult !== null) {
                const payload = {
                    reportName: `orderan`,
                    reportTotalAmount: saleResult.saleFinalPrice,
                    reportDescription: `Orderan dari ${saleResult.saleDeliverCompanyName}`,
                    reportCategory: 'income'
                };
                await reportModel_1.ReportModel.create(payload);
            }
        }
        if (!updated) {
            const message = `Sale not found with ID: ${value.saleId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        // const sale = await SaleModel.findByPk(value.saleId, {
        //   include: [
        //     {
        //       model: SaleItemModel,
        //       as: 'salesItems'
        //     }
        //   ]
        // })
        const response = response_1.ResponseData.success(exports.updateSale);
        logger_1.default.info('Sale updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.updateSale = updateSale;
