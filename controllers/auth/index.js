"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const find_1 = require("./find");
const login_1 = require("./login");
const register_1 = require("./register");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.UsersController = {
    login: login_1.userLogin,
    register: register_1.userRegister,
    findAll: find_1.findAllUser,
    findOne: find_1.findOneUser,
    update: update_1.updateUser,
    remove: remove_1.removeUser
};
