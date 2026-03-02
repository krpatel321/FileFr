import mongoose, { Document, Schema } from "mongoose";

export interface IFile extends Document {
  title: string;
  price: number;
  category: string;
  fileUrl: string;
  creator: mongoose.Types.ObjectId;
  sales: number;
}

const fileSchema = new Schema<IFile>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    fileUrl: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    sales: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IFile>("File", fileSchema);