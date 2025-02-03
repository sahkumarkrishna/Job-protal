import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/Models/Post.model"; // Ensure correct import

export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectDB();

    // Find the post by ID
    const post = await Post.findById(params.postId).populate({
      path: "comments",
      options: { sort: { createdAt: -1 } }, // Corrected sorting option
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ comments: post.comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};
