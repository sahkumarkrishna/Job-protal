import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/Models/Post.model"; // Ensure correct import

// Like a post
export const POST = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectDB();

    // Extract userId from request body
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // Ensure postId is available in params
    const { postId } = params;
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required." },
        { status: 400 }
      );
    }

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // Add userId to likes array (if not already present)
    await post.updateOne({ $pull: { likes: userId } });

    return NextResponse.json(
      { message: "Post disliked successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error disliking post:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};
