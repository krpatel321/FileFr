import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: "buyer" | "creator";
  phone?: string;
  panNumber?: string;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["buyer", "creator"], required: true },
    phone: String,
    panNumber: String,
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);