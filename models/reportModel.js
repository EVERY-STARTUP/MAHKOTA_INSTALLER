"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
// Define the Report model
exports.ReportModel = index_1.sequelize.define('Report', {
    ...zygote_1.ZygoteModel,
    reportId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    reportName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    reportTotalAmount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2), // Suitable for monetary values
        allowNull: false,
        defaultValue: 0.0 // Default saldo value
    },
    reportDescription: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true // Description can be optional
    },
    reportCategory: {
        type: sequelize_1.DataTypes.ENUM('income', 'spend'),
        allowNull: false
    }
}, {
    tableName: 'report', // Updated table name
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
