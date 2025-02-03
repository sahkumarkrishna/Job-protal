import mongoose, { Schema, Document, models, model } from "mongoose";
import { IUser } from "./User.Model";

export interface IComment {
  textMessage: string;
  user: IUser;
}

export interface ICommentDocument extends IComment, Document {
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<ICommentDocument>(
  {
    textMessage: {
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
  },
  { timestamps: true }
);

// Fix: Check if the model already exists
const Comment =
  models.Comment || model<ICommentDocument>("Comment", commentSchema);

export default Comment;
