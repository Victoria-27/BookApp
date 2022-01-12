import express from 'express'
import {addBooks,  getAllBook, updateBook, deleteBook, getSingleBook} from '../controller/bookControler'
import {auth} from '../middleware/auth'
import { pagination } from '../middleware/pagination'
import bookModel from '../model/BooksModel';
const router = express.Router();


router.post('/',auth, addBooks)
router.get('/',auth, pagination(bookModel), getAllBook)
router.get('/:id', auth, getSingleBook)
router.put('/:id',auth, updateBook)
router.delete('/:id', auth, deleteBook)

export default router;