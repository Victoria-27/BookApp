"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bookControler_1 = require("../controller/bookControler");
var auth_1 = require("../middleware/auth");
var pagination_1 = require("../middleware/pagination");
var BooksModel_1 = __importDefault(require("../model/BooksModel"));
var router = express_1.default.Router();
router.post('/', auth_1.auth, bookControler_1.addBooks);
router.get('/', auth_1.auth, (0, pagination_1.pagination)(BooksModel_1.default), bookControler_1.getAllBook);
router.get('/:id', auth_1.auth, bookControler_1.getSingleBook);
router.put('/:id', auth_1.auth, bookControler_1.updateBook);
router.delete('/:id', auth_1.auth, bookControler_1.deleteBook);
exports.default = router;
