"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var BookSchema = new mongoose_1.default.Schema({
    authorId: { type: mongoose_1.default.Types.ObjectId, ref: 'Authors' },
    title: { type: String },
    isPublished: { type: String },
    datePublished: { type: String },
    serialNumber: { type: Number }
}, {
    timestamps: true,
});
var bookModel = mongoose_1.default.model("Book", BookSchema);
exports.default = bookModel;
