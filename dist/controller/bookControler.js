"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.getAllBook = exports.addBooks = void 0;
var BooksModel_1 = __importDefault(require("../model/BooksModel"));
var utils_1 = require("../utils/utils");
function addBooks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, isPublished, datePublished, serialNumber, error, book, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, title = _a.title, isPublished = _a.isPublished, datePublished = _a.datePublished, serialNumber = _a.serialNumber;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    error = (0, utils_1.validateBooks)(req.body).error;
                    if (!error) return [3 /*break*/, 2];
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                case 2: return [4 /*yield*/, BooksModel_1.default.create({
                        title: title,
                        isPublished: isPublished,
                        datePublished: datePublished,
                        serialNumber: serialNumber
                    })];
                case 3:
                    book = _b.sent();
                    res.status(200).send(book);
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _b.sent();
                    console.log(err_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.addBooks = addBooks;
// find all Books
function getAllBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.send(res.paginatedResult);
            return [2 /*return*/];
        });
    });
}
exports.getAllBook = getAllBook;
function getSingleBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, book;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, BooksModel_1.default.find({ _id: id })];
                case 1:
                    book = _a.sent();
                    if (book) {
                        res.status(200).json({
                            status: "success",
                            data: book
                        });
                    }
                    else {
                        res.status(404).json({
                            message: 'Book not found'
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getSingleBook = getSingleBook;
// update a book
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, isPublished, datePublished, serialNumber, id, book, updatedBook;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, title = _a.title, isPublished = _a.isPublished, datePublished = _a.datePublished, serialNumber = _a.serialNumber;
                    id = req.params.id;
                    return [4 /*yield*/, BooksModel_1.default.findOne({ _id: id })];
                case 1:
                    book = _b.sent();
                    if (!book) {
                        res.status(404).json({
                            error: 'Book not found'
                        });
                    }
                    title && (book.title = title);
                    isPublished && (book.isPublished = isPublished);
                    datePublished && (book.datePublished = datePublished);
                    serialNumber && (book.serialNumber = serialNumber);
                    return [4 /*yield*/, book.save()];
                case 2:
                    updatedBook = _b.sent();
                    res.json({
                        msg: 'Updated successfully',
                        updatedBook: updatedBook
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateBook = updateBook;
// delete a books
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, book, deleteBook;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, BooksModel_1.default.findOne({ _id: id })];
                case 1:
                    book = _a.sent();
                    if (!book) {
                        res.status(404).json({
                            error: 'Unable to delete, Book not found'
                        });
                    }
                    return [4 /*yield*/, BooksModel_1.default.deleteOne({ _id: id })];
                case 2:
                    deleteBook = _a.sent();
                    res.json({
                        msg: 'Book deleted',
                        deleteBook: deleteBook
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteBook = deleteBook;
