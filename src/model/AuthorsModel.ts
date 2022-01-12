import mongoose from 'mongoose';

interface Author{
    name: string,
    age: number,
    address: string,
}

const AuthorSchema = new mongoose.Schema<Author>({
    name: { type: String },
    age: { type: Number},
    address: { type: String}
}, {
    timestamps: true
})

const authorModel = mongoose.model<Author>("Author", AuthorSchema)

export default authorModel;