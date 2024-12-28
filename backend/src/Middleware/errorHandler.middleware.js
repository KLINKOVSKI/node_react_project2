"use strict";
// In Middleware/errorHandler.middleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (err, req, res, next) {
    console.error(err.stack); // Log the error stack
    // Send a generic error response
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message,
    });
};
exports.errorHandler = errorHandler;
