import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../model/UsersModel';
import { validateUser } from '../utils/utils';

const router = express.Router();

/* GET users listing. */
const secret: string = process.env.JWT_SECRET as string;
const days: string = process.env.JWT_EXPIRES_IN as string;
const signToken = (id: string) => {
  return jwt.sign({ id }, secret, {
    expiresIn: days,
  });
};



export async function signup(req: Request, res: Response) {
    const {firstName, lastName, email, password, repeat_password, dateofbirth, phone} = req.body
  try {
    const {error} = validateUser(req.body);
    console.log(error)
    if (error) {
      res.status(404).json({
        message: "validation Error",
      });
      return;
    }
    const hashedPass = bcrypt.hashSync(password,10);
    // writing to db
    let user  = new userModel({
      firstName, lastName, email, password:hashedPass, dateofbirth, phone 
    })
    await user.save();
    const token = signToken(user._id);
    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json({
      message:"Registration successful"
    })
    
  } catch (err) {
   console.log(err)
   res.status(400).json({
     message: err
   })
  }
}
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
 try{
    //(1) if email and password exist
  if (!email || !password) {
    res.status(404).json({
      message:'please provide email and password'
    })
    return;
  
  }else{
    const user:any = await userModel.findOne({ email }).select('+password') ;
       const token = signToken(user._id);
       res.cookie('jwt',token, {httpOnly:true, maxAge:3 * 24 * 60 * 60*1000});
       res.status(201).json({
         message:"Login successful"
       })
    }
  }

 catch(err){
   res.status(404).json({
     message:"Not A Registered User"
   })
 }
}

  export async function logout(req: Request, res: Response){
    res.clearCookie('jwt')
     res.status(200).send('You have successfully logout')
  }

export default router;
