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
exports.login = exports.signup = void 0;
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var router = express_1.default.Router();
/* GET users listing. */
// router.post('/', (req, res) => {
//   const data = readFile();
//   const newUser = { ...req.body  }
//   let newDB = data.length ? data[data.length - 1]['id'] + 1 : 1; 
//   console.log(newDB)
//   let token  = jwt.sign({ id: newDB, email: newUser.email}, 'vikie-secrets')
//   const newData = {...newUser, id: newDB, dateRegistered: new Date().getTime()};
//    const allNewData = [...data, newData];
//    writeFile(allNewData);
//   res.json({
//     message: 'User created',
//     token,
//     user: newUser
//   })
// })
var secret = process.env.JWT_SECRET;
var days = process.env.JWT_EXPIRES_IN;
var signToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, secret, {
        expiresIn: days,
    });
};
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newUser, token, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, User.create({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                        })];
                case 1:
                    newUser = _a.sent();
                    token = signToken(newUser._id);
                    res.cookie('jwt', token, { httpOnly: true });
                    res.redirect('/login');
                    res.status(201).json({
                        token: newUser._id,
                    });
                    return [2 /*return*/];
                case 2:
                    err_1 = _a.sent();
                    res.redirect("/register?message=".concat(err_1.message));
                    res.status(400).json({
                        message: err_1.message,
                    });
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.signup = signup;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, _b, token;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    //(1) if email and password exist
                    if (!email || !password) {
                        res.render('login', { message: 'please provide email and password' });
                        // res.status(400).json({
                        //   status: "fail",
                        //   message: "please provide email and password",
                        // });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, User.findOne({ email: email }).select('+password')];
                case 1:
                    user = _c.sent();
                    _b = !user;
                    if (_b) return [3 /*break*/, 3];
                    return [4 /*yield*/, user.correctPassword(password, user.password)];
                case 2:
                    _b = !(_c.sent());
                    _c.label = 3;
                case 3:
                    if (!_b) return [3 /*break*/, 4];
                    res.render('login', { message: 'Incorrect Email or password' });
                    // res.status(401).json({
                    //   status: "fail",
                    //   message: "Incorrect Email or password",
                    // });
                    return [2 /*return*/];
                case 4:
                    token = signToken(user._id);
                    user.tokens = user.tokens.concat({ token: token });
                    return [4 /*yield*/, user.save()];
                case 5:
                    _c.sent();
                    res.cookie('jwt', token, { httpOnly: true });
                    // res.clearCookie()
                    res.redirect('/loginusers');
                    res.status(201).json({
                        token: user._id,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
exports.default = router;
