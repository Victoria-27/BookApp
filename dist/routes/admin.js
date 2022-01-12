"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var adminController_1 = require("../controller/adminController");
var books_controller_1 = require("../controller/books.controller");
var router = express_1.default.Router();
router.get('/', adminController_1.getAdminpage);
router.post('/', books_controller_1.postAuthor);
// router.post('/',postBook)
router.get('/delete/:id', books_controller_1.deleteAuthor);
exports.default = router;
