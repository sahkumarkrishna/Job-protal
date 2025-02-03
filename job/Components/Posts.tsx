import React from "react";
import Post from "./Post";
import { IPostDocument } from "@/Models/Post.model";

const Posts = ({ posts }: { posts: IPostDocument[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id as React.Key} post={post} />
      ))}
    </div>
  );
};

export default Posts;
