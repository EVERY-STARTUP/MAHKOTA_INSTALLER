"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlatform = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const platformModel_1 = require("../../models/platformModel"); // Updated model import
const platformSchema_1 = require("../../schemas/platformSchema"); // Updated schema import
const logger_1 = __importDefault(require("../../utilities/logger"));
const createPlatform = async (req, res) => {
    const { error, value } = (0, validateRequest_1.validateRequest)(platformSchema_1.createPlatformSchema, req.body);
    if (error) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        const platform = await platformModel_1.PlatformModel.create(value); // Updated model reference
        const response = response_1.ResponseData.success(platform);
        logger_1.default.info('Platform created successfully');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.createPlatform = createPlatform;
