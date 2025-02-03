import mongoose, { Document, model } from "mongoose";
import { IUser } from "./User.Model"; // Assuming you have a User model
import { IComment } from "./Comment.model";

export interface IPost {
  description: string;
  user: IUser;
  imageUrl?: string;
  likes?: string[];
  comments?: IComment[]; // Uncomment and define IComment if needed
}

export interface IPostDocument extends IPost, Document {
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<IPostDocument>(
  {
    description: {
      type: String,
      required: true,
    },
    user: {
      userId: {
        type: String,
        required: true,
      },
      profilePhoto: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    imageUrl: {
      type: String,
      default: "",
    },
    likes: {
      type: [String], // Array of user IDs who liked the post
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export const Post =
  mongoose.models.Post || model<IPostDocument>("Post", postSchema);
