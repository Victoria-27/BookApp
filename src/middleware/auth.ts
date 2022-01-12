import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Users  from '../model/UsersModel'

const secret: string = process.env.JWT_SECRET as string;


export async function auth(
    req: any,
    res: Response,
    next: NextFunction
  ){
    try {
      // console.log(req.cookies);
      const token = req.cookies.jwt;
      const decoded: any = jwt.verify(token, secret);
    //   console.log(decoded);
      const user = await Users.find({ _id: decoded.id});
      if (!user) {
       throw new Error('Thrown here')
      }
     
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send("User not logged in")
      
    }
  }
