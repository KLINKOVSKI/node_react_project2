"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = require("../config");
var errors_1 = require("../utils/errors");
var authMiddleware = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new errors_1.AuthError('No token provided');
        }
        var decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        res.locals.user = decoded; // Store user in res.locals
        next();
    }
    catch (error) {
        next(new errors_1.AuthError('Invalid token'));
    }
};
exports.authMiddleware = authMiddleware;
