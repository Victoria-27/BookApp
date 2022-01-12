import express from 'express';
import { signup,login,logout} from "../controller/usersController"



const router = express.Router();

router.get('/', function(req, res){
    res.send('I am working now')
})
router.post('/signup',signup);
router.post('/login',login)

router.get("/logout", logout);

export default router;
