"use server";

import { Post } from "@/Models/Post.model"; // Adjust the import path as necessary
import { IUser } from "@/Models/User.Model"; // Adjust the import path as necessary
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db"; // Adjust the import path as necessary
import { revalidatePath } from "next/cache";
import Comment from "@/Models/Comment.model";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Function to create a post
export const createPostAction = async (
  inputText: string,
  selectedFile: string | null
) => {
  try {
    await connectDB();

    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");
    if (!inputText) throw new Error("Input field is required");

    const userDatabase: IUser = {
      firstName: user.firstName || "DefaultFirstName",
      lastName: user.lastName || "DefaultLastName",
      userId: user.id,
      profilePhoto: user.imageUrl,
    };

    let uploadResponse = null;
    if (selectedFile) {
      uploadResponse = await cloudinary.uploader.upload(selectedFile);
    }

    await Post.create({
      description: inputText,
      user: userDatabase,
      imageUrl: uploadResponse?.secure_url || null,
    });

    revalidatePath("/");
  } catch (error: any) {
    console.error("Error creating post:", error);
    throw new Error(`Failed to create post: ${error.message}`);
  }
};

// Get all posts
export const getAllPosts = async () => {
  await connectDB();
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "comments", options: { sort: { createdAt: -1 } } });

    if (!posts) return [];
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

// Function to delete a post
export const deletePostAction = async (postId: string) => {
  try {
    await connectDB();

    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    if (post.user.userId !== user.id) {
      throw new Error("You are not the owner of this post");
    }

    await Post.deleteOne({ _id: postId });

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error(`Failed to delete post: ${error.message}`);
  }
};

// Function to create a comment
export const createCommentAction = async (
  postId: string,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const inputText = formData.get("inputText") as string;
    if (!inputText) throw new Error("Comment text is required");

    if (!postId) throw new Error("postId is required");

    const userDatabase: IUser = {
      firstName: user.firstName || "DefaultFirstName",
      lastName: user.lastName || "DefaultLastName",
      userId: user.id,
      profilePhoto: user.imageUrl,
    };

    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    const comment = await Comment.create({
      textMessage: inputText,
      user: userDatabase,
    });

    if (!post.comments) post.comments = [];
    post.comments.push(comment._id);
    await post.save();

    revalidatePath("/");
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error(`Failed to create comment: ${error.message}`);
  }
};
