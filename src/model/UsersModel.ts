import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'


export interface IUser extends Document { 
    firstName:string,
    lastName:string,
    DOB:Date,
    email: string;
    password: string;
    phone:string
   
  }

const UserSchema = new mongoose.Schema<IUser>({
    firstName: { type: String,
      required:[true, "First name is required"]
     },
    lastName: { type: String,
      required:[true, "Last name is required"] },
    DOB: { type: Date},
    email: { 
      type: String,
      required:[true, "Email is required"],
      unique:true,
      lowercase:true,
      validate:[validator.isEmail, "Please provde a valid email"]
    },
    password: { 
      type: String,
      required:[true, 'password is reqiured'],
      minlength:[8, "minimum password length is 8 characters"],
      select:false,
    },
    phone: {type: String,
    unique:true,
    }
}, {
    timestamps: true
})

// fire up a function before doc is saved into the database
UserSchema.pre<IUser>('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
 })
 
 

const userModel =  mongoose.model<IUser>('User', UserSchema)

export default userModel;
