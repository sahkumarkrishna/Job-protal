import mongoose, { Document, model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  userId: string;
  profilePhoto?: string;
  bio?: string;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true, // Ensures userId is unique
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

export const User =
  mongoose.models.User || model<IUserDocument>("User", userSchema);
