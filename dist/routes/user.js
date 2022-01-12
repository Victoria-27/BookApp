"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersController_1 = require("../controller/usersController");
var router = express_1.default.Router();
router.post('/signup', usersController_1.signup);
router.post('/login', usersController_1.login);
router.get("/logout", usersController_1.logout);
exports.default = router;
