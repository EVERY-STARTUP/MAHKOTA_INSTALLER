"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const setting_1 = require("../../controllers/setting");
const router = (0, express_1.Router)();
router.get('/', setting_1.settingController.find);
router.patch('/', setting_1.settingController.update);
exports.default = router;
