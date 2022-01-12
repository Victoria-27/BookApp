import express, { Request, Response } from 'express'
import bookModel from '../model/BooksModel'
import {validateBooks} from '../utils/utils'

export async function addBooks(req: Request, res: Response){
    const { title, isPublished, datePublished, serialNumber} = req.body
    try{
        const {error} = validateBooks(req.body);
        if(error){
            return res.status(400).send(error.details[0].message)
        }else{
           const book = await bookModel.create({
            title,
            isPublished,
            datePublished,
            serialNumber
        })
        res.status(200).send(book)
        }
       
    }catch(err){
       console.log(err)
    }
}

// find all Books
export async function getAllBook(req: Request, res: any){
    res.send(res.paginatedResult)
}

export async function getSingleBook(req: Request, res: Response){
    const { id } = req.params
    const book = await bookModel.find({_id: id})
    if(book){
        res.status(200).json({
         status:"success",
         data: book
        })
    } else{
        res.status(404).json({
            message: 'Book not found'
        })
    }

}

// update a book
export async function updateBook(req: Request, res: Response){
    const {   title, isPublished, datePublished, serialNumber } = req.body
    const { id } = req.params
    const book = await bookModel.findOne({_id: id})
    if(!book){
        res.status(404).json({
            error: 'Book not found'
        })
    }

    title && (book!.title = title)
    isPublished && (book!.isPublished = isPublished)
    datePublished && (book!.datePublished = datePublished)
    serialNumber && (book!.serialNumber = serialNumber)
    const updatedBook = await book!.save()

    res.json({
        msg: 'Updated successfully',
        updatedBook: updatedBook
    })
}

// delete a books
export async function deleteBook(req: Request, res: Response){
    const { id } = req.params
    const book = await bookModel.findOne({_id: id})
    if(!book){
    res.status(404).json({
        error: 'Unable to delete, Book not found'
    })
    }
    const deleteBook = await bookModel.deleteOne({_id: id})
    res.json({
        msg: 'Book deleted',
        deleteBook: deleteBook
    })
    }