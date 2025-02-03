import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageCircleMore, Repeat, Send, ThumbsUp } from "lucide-react";
import { IPostDocument } from "@/Models/Post.model";
import { useUser } from "@clerk/nextjs";
import Comments from "./Comments";
import CommentInput from "./CommentInput";

const SocialOptions = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes ?? []);
  const [loading, setLoading] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);

  // Ensure `liked` state is set correctly when `user` is available
  useEffect(() => {
    if (user) {
      setLiked(post.likes?.includes(user.id) ?? false);
    }
  }, [user, post.likes]);

  const likeOrDislikeHandler = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    setLoading(true);
    setLiked((prev) => !prev);
    setLikes((prevLikes) =>
      liked ? prevLikes.filter((id) => id !== user.id) : [...prevLikes, user.id]
    );

    try {
      const action = liked ? "dislike" : "like";
      const res = await fetch(`/api/posts/${post._id}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) throw new Error("Failed to like or dislike the post");
    } catch (error) {
      console.error("Error in like/dislike action:", error);
      setLiked((prev) => !prev);
      setLikes((prevLikes) =>
        liked
          ? [...prevLikes, user.id]
          : prevLikes.filter((id) => id !== user.id)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Likes Count */}
      <div className="text-sm mx-2 flex items-center justify-between border-b border-gray-300 p-2">
        {likes.length > 0 && (
          <p className="text-xs text-gray-500 hover:text-blue-500 hover:underline cursor-pointer">
            {likes.length} {likes.length === 1 ? "like" : "likes"}
          </p>
        )}
      </div>

      {/* Social Buttons */}
      <div className="flex items-center justify-between m-1">
        <Button
          onClick={likeOrDislikeHandler}
          variant="ghost"
          className={`flex items-center gap-2 rounded-lg ${
            liked ? "text-blue-600" : "text-gray-600"
          } hover:text-black`}
          aria-label={liked ? "Unlike post" : "Like post"}
          disabled={loading}
        >
          <ThumbsUp className={liked ? "text-blue-600" : "text-gray-600"} />
          <p>{liked ? "Liked" : "Like"}</p>
        </Button>

        <Button
          onClick={() => setCommentOpen((prev) => !prev)}
          variant="ghost"
          className="flex items-center gap-2 rounded-lg text-gray-600 hover:text-black"
          aria-label="Toggle comments"
        >
          <MessageCircleMore
            className={
              post.comments && post.comments.length > 0
                ? "text-blue-600"
                : "text-gray-600"
            }
          />
          <p>Comment</p>
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-lg text-gray-600 hover:text-black"
          aria-label="Repost this post"
        >
          <Repeat />
          <p className="ml-1">Repost</p>
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-lg text-gray-600 hover:text-black"
          aria-label="Send this post"
        >
          <Send />
          <p className="ml-1">Send</p>
        </Button>
      </div>

      {/* Comments Section */}
      {commentOpen && (
        <div className="p-4">
          <CommentInput postId={post._id} />
          <Comments post={post} />
        </div>
      )}
    </div>
  );
};

export default SocialOptions;
