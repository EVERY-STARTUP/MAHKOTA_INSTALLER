"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const settingModel_1 = require("../../models/settingModel");
const settingSchema_1 = require("../../schemas/settingSchema");
const logger_1 = __importDefault(require("../../utilities/logger"));
const update = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(settingSchema_1.updateSettingSchema, req.body);
    if (error) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const [updated] = await settingModel_1.SettingModel.update(value, {
            where: { settingId: value.settingId }
        });
        if (!updated) {
            const message = `Setting not found with ID: ${value.settingId}`;
            logger_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error(message));
        }
        const response = response_1.ResponseData.success({
            message: 'Setting updated successfully'
        });
        logger_1.default.info('Setting updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.update = update;
