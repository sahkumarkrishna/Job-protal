"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { IPostDocument } from "@/Models/Post.model";
import ProfilePhoto from "./Shared/ProfilePhoto";
import PostContent from "./PostContent";
import SocialOptions from "./SocialOptions";
import TimeAgo from "timeago-react";
import { deletePostAction } from "../lib/serveractions";

const Posts = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const fullName = `${post?.user?.firstName || ""} ${
    post?.user?.lastName || ""
  }`.trim();

  const loggedInUser = user?.id === post?.user?.userId;

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!isConfirmed) return; // Stop execution if user cancels

    try {
      await deletePostAction(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300">
      <div className="flex gap-2 p-4">
        <ProfilePhoto src={post?.user?.profilePhoto} />
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-sm font-bold">
              {fullName}
              {loggedInUser && (
                <Badge variant="secondary" className="ml-2">
                  You
                </Badge>
              )}
            </h1>
            <p className="text-xs text-gray-500">
              @{user?.username || "username"}
            </p>
            <p className="text-xs text-gray-500">
              <TimeAgo datetime={new Date(post.createdAt)} />
            </p>
          </div>
        </div>
        {loggedInUser && (
          <Button
            onClick={handleDelete}
            size="icon"
            className="rounded-full"
            variant="outline"
          >
            <Trash2 />
          </Button>
        )}
      </div>
      <PostContent post={post} />
      <SocialOptions post={post} />
    </div>
  );
};

export default Posts;
