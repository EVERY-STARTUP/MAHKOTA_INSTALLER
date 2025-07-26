"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const response_1 = require("../../utilities/response");
const http_status_codes_1 = require("http-status-codes");
const configs_1 = require("../../configs");
const uploadFile = async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileUrl = `http://localhost:${configs_1.APP_CONFIGS.port}/${filePath}`;
        res.json({ message: 'File uploaded successfully!', fileUrl });
    }
    catch (error) {
        const message = `unable to process request! error ${error.message}`;
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.uploadFile = uploadFile;
