"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema, requestData) => {
    return schema.validate(requestData, { abortEarly: false });
};
exports.validateRequest = validateRequest;
