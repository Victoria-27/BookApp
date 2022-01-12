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
exports.logout = exports.login = exports.signup = void 0;
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var UsersModel_1 = __importDefault(require("../model/UsersModel"));
var utils_1 = require("../utils/utils");
var router = express_1.default.Router();
/* GET users listing. */
var secret = process.env.JWT_SECRET;
var days = process.env.JWT_EXPIRES_IN;
var signToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, secret, {
        expiresIn: days,
    });
};
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, email, password, repeat_password, dateofbirth, phone, error, hashedPass, user, token, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, repeat_password = _a.repeat_password, dateofbirth = _a.dateofbirth, phone = _a.phone;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    error = (0, utils_1.validateUser)(req.body).error;
                    console.log(error);
                    if (error) {
                        res.status(404).json({
                            message: "validation Error",
                        });
                        return [2 /*return*/];
                    }
                    hashedPass = bcryptjs_1.default.hashSync(password, 10);
                    user = new UsersModel_1.default({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hashedPass,
                        dateofbirth: dateofbirth,
                        phone: phone
                    });
                    return [4 /*yield*/, user.save()];
                case 2:
                    _b.sent();
                    token = signToken(user._id);
                    res.cookie('jwt', token, { httpOnly: true });
                    res.status(201).json({
                        message: "Registration successful"
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    console.log(err_1);
                    res.status(400).json({
                        message: err_1
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.signup = signup;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, token, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    if (!(!email || !password)) return [3 /*break*/, 2];
                    res.status(404).json({
                        message: 'please provide email and password'
                    });
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, UsersModel_1.default.findOne({ email: email }).select('+password')];
                case 3:
                    user = _b.sent();
                    token = signToken(user._id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
                    res.status(201).json({
                        message: "Login successful"
                    });
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_2 = _b.sent();
                    res.status(404).json({
                        message: "Not A Registered User"
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.clearCookie('jwt');
            res.status(200).send('You have successfully logout');
            return [2 /*return*/];
        });
    });
}
exports.logout = logout;
exports.default = router;
