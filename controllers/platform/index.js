"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findOne_1 = require("./findOne");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.platformControllers = {
    findAll: findAll_1.findAllPlatforms,
    findOne: findOne_1.findPlatform,
    create: create_1.createPlatform,
    update: update_1.updatePlatform,
    remove: remove_1.removePlatform
};
