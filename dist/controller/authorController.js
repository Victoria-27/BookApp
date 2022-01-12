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
exports.deleteAuthor = exports.updateAuthor = exports.getSingleAuthor = exports.getAllAuthor = exports.postAuthor = void 0;
var utils_1 = require("../utils/utils");
var AuthorsModel_1 = __importDefault(require("../model/AuthorsModel"));
var postAuthor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, age, address, error, user, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, age = _a.age, address = _a.address;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                error = (0, utils_1.validateEntry)(req.body).error;
                if (!error) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(400).send(error.details[0].message)];
            case 2: return [4 /*yield*/, AuthorsModel_1.default.create({
                    name: name,
                    age: age,
                    address: address
                })];
            case 3:
                user = _b.sent();
                res.status(200).send(user);
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postAuthor = postAuthor;
// find all Author
function getAllAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.send(res.paginatedResult);
            return [2 /*return*/];
        });
    });
}
exports.getAllAuthor = getAllAuthor;
function getSingleAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, author;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, AuthorsModel_1.default.find({ _id: id })];
                case 1:
                    author = _a.sent();
                    if (author) {
                        res.status(200).json({
                            status: "success",
                            data: author
                        });
                    }
                    else {
                        res.status(404).json({
                            message: 'Author not found'
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getSingleAuthor = getSingleAuthor;
// update an author
function updateAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, age, address, id, author, updatedAuthor;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, age = _a.age, address = _a.address;
                    id = req.params.id;
                    return [4 /*yield*/, AuthorsModel_1.default.findOne({ _id: id })];
                case 1:
                    author = _b.sent();
                    if (!author) {
                        res.status(404).json({
                            error: 'Author not found'
                        });
                    }
                    name && (author.name = name);
                    age && (author.age = age);
                    address && (author.address = address);
                    return [4 /*yield*/, author.save()];
                case 2:
                    updatedAuthor = _b.sent();
                    res.json({
                        msg: 'Updated successfully',
                        updatedAuthor: updatedAuthor
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateAuthor = updateAuthor;
// delete an author
function deleteAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, author, deleteAuthor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, AuthorsModel_1.default.findOne({ _id: id })];
                case 1:
                    author = _a.sent();
                    if (!author) {
                        res.status(404).json({
                            error: 'Unable to delete, Author not found'
                        });
                    }
                    return [4 /*yield*/, AuthorsModel_1.default.deleteOne({ _id: id })];
                case 2:
                    deleteAuthor = _a.sent();
                    res.json({
                        msg: 'Author deleted sucessfully',
                        deleteAuthor: deleteAuthor
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteAuthor = deleteAuthor;
