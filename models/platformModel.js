"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
exports.PlatformModel = index_1.sequelize.define('Platform', {
    ...zygote_1.ZygoteModel,
    platformId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    platformName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'platform', // Updated table name
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
