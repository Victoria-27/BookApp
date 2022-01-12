"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authorController_1 = require("../controller/authorController");
var auth_1 = require("../middleware/auth");
var pagination_1 = require("../middleware/pagination");
var AuthorsModel_1 = __importDefault(require("../model/AuthorsModel"));
var router = express_1.default.Router();
router.post('/', auth_1.auth, authorController_1.postAuthor);
router.get('/', auth_1.auth, (0, pagination_1.pagination)(AuthorsModel_1.default), authorController_1.getAllAuthor);
router.get('/:id', auth_1.auth, authorController_1.getSingleAuthor);
router.put('/:id', auth_1.auth, authorController_1.updateAuthor);
router.delete('/:id', auth_1.auth, authorController_1.deleteAuthor);
exports.default = router;
