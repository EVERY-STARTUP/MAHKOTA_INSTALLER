"use strict";
// src/routes/v1/uploadFileRouter.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_file_1 = require("../../controllers/upload-file");
const upload_file_2 = require("../../middlewares/upload-file");
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const configs_1 = require("../../configs");
const router = (0, express_1.Router)();
const checkFileSizeMiddleware = (req, res, next) => {
    try {
        if (req.file) {
            const fileSizeInKiloBytes = req.file.size / 1024;
            if (fileSizeInKiloBytes > +configs_1.APP_CONFIGS.maximumUploadFile) {
                throw new Error('Maximum file size is 2MB');
            }
        }
        next();
    }
    catch (error) {
        const message = 'Maximum file size is 2MB';
        const response = response_1.ResponseData.error(message);
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
    }
};
router.post('/', checkFileSizeMiddleware, upload_file_2.uploadMiddleware.single('file'), async (req, res) => await (0, upload_file_1.uploadFile)(req, res));
exports.default = router;
