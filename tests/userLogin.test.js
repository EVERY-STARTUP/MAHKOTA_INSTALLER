"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testHelpers_1 = require("../utilities/testHelpers");
const login_1 = require("../controllers/auth/login");
const user_1 = require("../models/user");
const http_status_codes_1 = require("http-status-codes");
jest.mock('../models/user');
describe('userLogin Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = (0, testHelpers_1.mockRequest)();
        res = (0, testHelpers_1.mockResponse)();
    });
    test('should return 404 if user is not found', async () => {
        req.body = { userName: 'jhon', userPassword: 'qwerty' };
        user_1.UserModel.findOne = jest.fn().mockResolvedValue(null);
        await (0, login_1.userLogin)(req, res);
        expect(user_1.UserModel.findOne).toHaveBeenCalledWith({
            where: {
                deleted: 0,
                userName: 'jhon'
            }
        });
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.NOT_FOUND);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            errorMessage: 'Account not found. Please register first!',
            data: null,
            next: null,
            requestParam: null,
            version: {
                code: '1.0.0',
                name: ''
            }
        });
    });
    // ... other test cases
});
