"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
exports.SettingModel = index_1.sequelize.define('Settings', {
    ...zygote_1.ZygoteModel,
    settingId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    settingWhatsappNumber: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    settingBanners: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    settingAffiliatePercentage: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0.0
    }
}, {
    tableName: 'settings',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
