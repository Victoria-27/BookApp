import Joi from 'joi';


// validating the data that is passed
interface author{
    name:string,
    age:string,
    address:string
}

export const validateEntry = (data: author) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required(),
    }).unknown();
    return schema.validate(data);
}


interface user{
    name:string,
    email:string,
    password:string,
    repeat_password:string
}
export const validateUser = (data: user) => {
const registerSchema = Joi.object({
      firstName: Joi.string().trim().min(2).max(64).required(),
      lastName: Joi.string().trim().min(2).max(64).required(),
      email: Joi
        .string()
        .trim()
        .lowercase()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } }),
        password: Joi.string().required(),
        repeat_password: Joi.ref("password"),
        dateofbirth:Joi.string().required(),
        phone:Joi.string()
      
    })
    .with("password", "repeat_password");
    return registerSchema.validate(data)
}

interface book{
    title:string,
    isPublished:string,
    datePublished:string,
    serialNumber:number
}

export const validateBooks = (data: book) =>{
    const schema = Joi.object({
        title: Joi.string().required(),
        isPublished: Joi.string().required(),
        datePublished: Joi.string().required(),
        serialNumber: Joi.number().required(),
    }).unknown();
    return schema.validate(data);
}