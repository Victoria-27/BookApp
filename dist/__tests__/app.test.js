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
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
describe('GET AUTHORS', function () {
    test('should return 200 status for all authors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).get('/author')];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should return 200 status for a single author', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).get('/author/1')];
                case 1: return [4 /*yield*/, (_a.sent())];
                case 2:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('POST AUTHOR', function () {
    test('return status code 201 if author data is passed correctly ', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/author').send({
                        "author": "mary Dawn",
                        "age": 28,
                        "address": "5, Wall Street, Buckingham",
                        "books": [
                            {
                                "name": "Tomorrow is coming",
                                "isPublished": true,
                                "datePublished": 1637159508581,
                                "serialNumber": 10
                            },
                            {
                                "name": "Octobers very own",
                                "isPublished": false,
                                "datePublished": null,
                                "serialNumber": null
                            }
                        ]
                    }).set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(201)
                        .expect(function (res) {
                        res.body.data.length > 0;
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('should return bad request if some data is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post('/author').send({
                        author: "mary Dawn",
                        address: "5, Wall Street, Buckingham",
                        books: [
                            {
                                "name": "Tomorrow is coming",
                                "isPublished": true,
                                "datePublished": 1637159508581,
                                "serialNumber": 10
                            },
                            {
                                "name": "Octobers very own",
                                "isPublished": false,
                                "datePublished": null,
                                "serialNumber": null
                            }
                        ]
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('DELETE AN AUTHOR', function () {
    test('it responds witha a message of Deleted', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newAuthor, removedAuthor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post('/author')
                        .send({
                        "author": "mary Dawn",
                        "age": 28,
                        "address": "5, Wall Street, Buckingham",
                        "books": [
                            {
                                "name": "Tomorrow is coming",
                                "isPublished": true,
                                "datePublished": 1637159508581,
                                "serialNumber": 10
                            },
                            {
                                "name": "Octobers very own",
                                "isPublished": false,
                                "datePublished": null,
                                "serialNumber": null
                            }
                        ]
                    })];
                case 1:
                    newAuthor = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default).delete("/author/".concat(newAuthor.body.data.id))];
                case 2:
                    removedAuthor = _a.sent();
                    expect(removedAuthor.body.message).toEqual("Trashed!");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('PUT AUTHOR', function () {
    test('it responds with an updated data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newAuthor, updatedAuthor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post('/author')
                        .send({
                        "author": "mary daniel",
                        "age": 25,
                        "address": "5, Wall Street, ajson street, odumota lagos ",
                        "books": [
                            {
                                "name": "Tomorrow is coming",
                                "isPublished": true,
                                "datePublished": 1637159508581,
                                "serialNumber": 10
                            },
                            {
                                "name": "Octobers very own",
                                "isPublished": false,
                                "datePublished": null,
                                "serialNumber": null
                            }
                        ]
                    })];
                case 1:
                    newAuthor = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .put("/author/".concat(newAuthor.body.data.id))
                            .send({ author: "sylvester stallone" })];
                case 2:
                    updatedAuthor = _a.sent();
                    expect(updatedAuthor.body.data.author).toBe("sylvester stallone");
                    expect(updatedAuthor.body.data).toHaveProperty("id");
                    expect(updatedAuthor.statusCode).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
});
