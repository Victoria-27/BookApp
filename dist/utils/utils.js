"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBooks = exports.validateUser = exports.validateEntry = void 0;
var joi_1 = __importDefault(require("joi"));
var validateEntry = function (data) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        address: joi_1.default.string().required(),
    }).unknown();
    return schema.validate(data);
};
exports.validateEntry = validateEntry;
var validateUser = function (data) {
    var registerSchema = joi_1.default.object({
        firstName: joi_1.default.string().trim().min(2).max(64).required(),
        lastName: joi_1.default.string().trim().min(2).max(64).required(),
        email: joi_1.default
            .string()
            .trim()
            .lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } }),
        password: joi_1.default.string().required(),
        repeat_password: joi_1.default.ref("password"),
        dateofbirth: joi_1.default.string().required(),
        phone: joi_1.default.string()
    })
        .with("password", "repeat_password");
    return registerSchema.validate(data);
};
exports.validateUser = validateUser;
var validateBooks = function (data) {
    var schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        isPublished: joi_1.default.string().required(),
        datePublished: joi_1.default.string().required(),
        serialNumber: joi_1.default.number().required(),
    }).unknown();
    return schema.validate(data);
};
exports.validateBooks = validateBooks;
