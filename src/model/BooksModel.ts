import mongoose from "mongoose";

interface Book{
  authorId: mongoose.Types.ObjectId,
  title: string,
  isPublished: string,
  datePublished: string,
  serialNumber: number
}

const BookSchema = new mongoose.Schema<Book>({
    authorId: { type:mongoose.Types.ObjectId, ref: 'Authors'},
    title: { type: String },
    isPublished: { type: String },
    datePublished: { type: String},
    serialNumber: { type: Number }
  },
  {
    timestamps: true,
  }
);

const bookModel = mongoose.model<Book>("Book", BookSchema)

export default bookModel;