// app/api/posts/[postId]/route.ts
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/Models/Post.model"; // Ensure correct import

// GET handler for fetching likes
export const GET = async (
  _req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectDB();

    const post = await Post.findById(params.postId); // Ensure that the post ID is passed correctly
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ likes: post.likes });
  } catch (error) {
    console.error("Error fetching post likes:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};

// POST handler for liking/disliking a post
export const POST = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectDB();

    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const postId = params.postId; // Access postId from params

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // Logic to like or dislike
    const action = req.url.includes("like") ? "like" : "dislike";
    if (action === "like") {
      if (!post.likes.includes(userId)) {
        await post.updateOne({ $addToSet: { likes: userId } });
      }
    } else {
      await post.updateOne({ $pull: { likes: userId } });
    }

    return NextResponse.json({ message: `Post ${action}d successfully.` });
  } catch (error) {
    console.error("Error processing like/dislike:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};
