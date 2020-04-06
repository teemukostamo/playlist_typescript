"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
