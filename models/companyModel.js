"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
exports.CompanyModel = index_1.sequelize.define('Company', {
    ...zygote_1.ZygoteModel,
    companyId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    companyName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    companyAddress: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'company',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
