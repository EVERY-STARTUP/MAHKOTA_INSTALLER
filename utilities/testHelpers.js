"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResponse = exports.mockRequest = void 0;
const globals_1 = require("@jest/globals");
const mockRequest = (body = {}, params = {}, query = {}) => {
    return {
        body,
        params,
        query,
        get: globals_1.jest.fn(),
        headers: {}
    };
};
exports.mockRequest = mockRequest;
const mockResponse = () => {
    const res = {};
    res.status = globals_1.jest.fn().mockReturnValue(res);
    res.json = globals_1.jest.fn().mockReturnValue(res);
    res.send = globals_1.jest.fn().mockReturnValue(res);
    res.setHeader = globals_1.jest.fn().mockReturnValue(res);
    return res;
};
exports.mockResponse = mockResponse;
