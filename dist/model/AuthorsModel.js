"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var AuthorSchema = new mongoose_1.default.Schema({
    name: { type: String },
    age: { type: Number },
    address: { type: String }
}, {
    timestamps: true
});
var authorModel = mongoose_1.default.model("Author", AuthorSchema);
exports.default = authorModel;
