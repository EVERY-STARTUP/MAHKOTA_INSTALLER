"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findOne_1 = require("./findOne");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.companyControllers = {
    findAll: findAll_1.findAll,
    findOne: findOne_1.findOne,
    create: create_1.create,
    update: update_1.update,
    remove: remove_1.remove
};
