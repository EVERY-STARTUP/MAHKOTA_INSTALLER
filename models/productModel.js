"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
const productVariantModel_1 = require("./productVariantModel");
exports.ProductModel = index_1.sequelize.define('Product', {
    ...zygote_1.ZygoteModel,
    productId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    productName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    productCode: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    productCategory: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    productImage: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    productPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    productStockQuantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'products',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});
exports.ProductModel.hasMany(productVariantModel_1.ProductVariantModel, {
    foreignKey: 'productId',
    as: 'variants'
});
productVariantModel_1.ProductVariantModel.belongsTo(exports.ProductModel, {
    foreignKey: 'productId',
    as: 'product'
});
