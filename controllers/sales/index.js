"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findOne_1 = require("./findOne");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.saleControllers = {
    findAll: findAll_1.findAllSales,
    findOne: findOne_1.findOneSale,
    create: create_1.createSale,
    update: update_1.updateSale,
    remove: remove_1.removeSale
};
