import express, { Request, Response } from 'express'
import { validateEntry} from '../utils/utils';
import authorModel from '../model/AuthorsModel'


export const postAuthor = async(req:Request, res:Response)=>{
  const { name, age, address} = req.body
  try{
      const {error} = validateEntry(req.body);
      if(error){
          return res.status(400).send(error.details[0].message)
      }else{
         const user = await authorModel.create({
          name,
          age,
          address
      })
      res.status(200).send(user)
      }
     
  }catch(err){
     console.log(err)
  }
}
// find all Author
export async function getAllAuthor(req: Request, res: any){
   res.send(res.paginatedResult)
}
export async function getSingleAuthor(req: Request, res: Response){
    const { id } = req.params
    const author = await authorModel.find({_id: id})
    if(author){
        res.status(200).json({
         status:"success",
         data: author
        })
    } else{
        res.status(404).json({
            message: 'Author not found'
        })
    }

}

// update an author
export async function updateAuthor(req: Request, res: Response){
    const {  name, age, address } = req.body
    const { id } = req.params
    const author = await authorModel.findOne({_id: id})
    if(!author){
        res.status(404).json({
            error: 'Author not found'
        })
    }

    name && (author!.name = name)
    age && (author!.age = age)
    address && (author!.address = address)
    const updatedAuthor = await author!.save()

    res.json({
        msg: 'Updated successfully',
        updatedAuthor: updatedAuthor
    })
}

// delete an author
export async function deleteAuthor(req: Request, res: Response){
    const { id } = req.params
    const author = await authorModel.findOne({_id: id})
    if(!author){
    res.status(404).json({
        error: 'Unable to delete, Author not found'
    })
    }
    const deleteAuthor = await authorModel.deleteOne({_id: id})
    res.json({
        msg: 'Author deleted sucessfully',
        deleteAuthor: deleteAuthor
    })
    }