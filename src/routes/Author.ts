import express from 'express';

import {postAuthor, getAllAuthor, updateAuthor, deleteAuthor, getSingleAuthor } from '../controller/authorController'
import {auth} from '../middleware/auth'
import { pagination } from '../middleware/pagination';
import authorModel from '../model/AuthorsModel'


const router = express.Router();


router.post('/',auth,postAuthor)
router.get('/', auth,pagination(authorModel),getAllAuthor)
router.get('/:id', auth, getSingleAuthor)
router.put('/:id',auth, updateAuthor)
router.delete('/:id',auth, deleteAuthor)




export default router;