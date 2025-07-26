"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findOne_1 = require("./findOne");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.productControllers = {
    findAll: findAll_1.findAllProducts,
    findOne: findOne_1.findProduct,
    create: create_1.createProduct,
    update: update_1.updateProduct,
    remove: remove_1.removeProduct
};
