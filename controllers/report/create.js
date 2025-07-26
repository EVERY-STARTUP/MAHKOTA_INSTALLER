"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateRequest_1 = require("../../utilities/validateRequest");
const response_1 = require("../../utilities/response");
const reportModel_1 = require("../../models/reportModel"); // Import the Report model
const reportSchema_1 = require("../../schemas/reportSchema"); // Import the create schema
const logger_1 = __importDefault(require("../../utilities/logger"));
const create = async (req, res) => {
    // Validate the incoming request body using Joi schema
    const { error, value } = (0, validateRequest_1.validateRequest)(reportSchema_1.createReportSchema, req.body);
    // If there is an error in the validation
    if (error) {
        const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`;
        logger_1.default.warn(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error(message));
    }
    try {
        // Create a new report record in the database using the validated data
        const report = await reportModel_1.ReportModel.create(value);
        // Prepare the success response
        const response = response_1.ResponseData.success(report);
        logger_1.default.info('Report created successfully');
        // Return the success response with status 201 (Created)
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (error) {
        // Handle any unexpected errors during report creation
        const message = `Unable to process request! Error: ${error.message}`;
        logger_1.default.error(message, { stack: error.stack });
        // Return an internal server error response
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_1.ResponseData.error(message));
    }
};
exports.create = create;
