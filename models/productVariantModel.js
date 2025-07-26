"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const zygote_1 = require("./zygote");
exports.ProductVariantModel = index_1.sequelize.define('ProductVariant', {
    ...zygote_1.ZygoteModel,
    variantId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'products',
            key: 'productId'
        },
        onDelete: 'CASCADE'
    },
    variantName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    variantPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    variantSize: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    variantColor: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    variantCategory: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    variantImage: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'product_variants',
    timestamps: false,
    underscored: true,
    paranoid: true,
    freezeTableName: true
});
