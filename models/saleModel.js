"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const user_1 = require("./user");
const zygote_1 = require("./zygote");
const saleItemModel_1 = require("./saleItemModel");
exports.SaleModel = index_1.sequelize.define('Sale', {
    ...zygote_1.ZygoteModel,
    saleId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: user_1.UserModel,
            key: 'userId'
        }
    },
    saleTotalPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    saleFinalPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    saleTax: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
    },
    saleDiscount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
    },
    saleDeliveryCost: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    saleCode: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false
    },
    salePlatformName: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    saleDeliverCompanyName: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    saleDeliverCompanyAddress: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    salePaymentMethod: {
        type: sequelize_1.DataTypes.ENUM('cash', 'credit_card'),
        allowNull: true
    },
    salePo: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: true
    },
    saleOrderStatus: {
        type: sequelize_1.DataTypes.ENUM('waiting', 'process', 'cancel', 'done'),
        allowNull: true,
        defaultValue: 'waiting'
    }
}, {
    tableName: 'sales',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
exports.SaleModel.hasMany(saleItemModel_1.SaleItemModel, {
    as: 'saleItems',
    foreignKey: 'saleId'
});
