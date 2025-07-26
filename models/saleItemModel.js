"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleItemModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const saleModel_1 = require("./saleModel");
const zygote_1 = require("./zygote");
const productModel_1 = require("./productModel");
exports.SaleItemModel = index_1.sequelize.define('SaleItem', {
    ...zygote_1.ZygoteModel,
    saleItemId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    saleId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: saleModel_1.SaleModel,
            key: 'saleId'
        }
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: productModel_1.ProductModel,
            key: 'productId'
        }
    },
    saleItemQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    saleItemProductName: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    saleItemProductCode: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    saleItemPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    saleItemSubtotal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'sale_items',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
exports.SaleItemModel.belongsTo(productModel_1.ProductModel, {
    as: 'product',
    foreignKey: 'productId'
});
