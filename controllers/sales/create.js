"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSale = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const saleModel_1 = require("../../models/saleModel");
const saleItemModel_1 = require("../../models/saleItemModel");
const saleSchema_1 = require("../../schemas/saleSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const generateId_1 = require("../../utilities/generateId");
const createSale = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(saleSchema_1.createSaleSchema, req.body);
    if (error) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const salePo = value?.salePo?.length === 0 ? (0, generateId_1.generateUniqueId)() : value.salePo;
        const { salesItems, ...saleData } = value;
        const sale = await saleModel_1.SaleModel.create({ ...saleData, saleCode: (0, generateId_1.generateUniqueId)(), userId: 1, salePo }, {
            include: [
                {
                    model: saleItemModel_1.SaleItemModel,
                    as: 'saleItems'
                }
            ]
        });
        if (salesItems && salesItems.length) {
            await Promise.all(salesItems.map((item) => saleItemModel_1.SaleItemModel.create({
                ...item,
                saleId: sale.saleId
            })));
        }
        const response = response_1.ResponseData.success(sale);
        logger_1.default.info('Sale created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.createSale = createSale;
