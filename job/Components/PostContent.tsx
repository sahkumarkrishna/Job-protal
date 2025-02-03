import { IPostDocument } from "@/Models/Post.model";
import Image from "next/image";
import React from "react";

const PostContent = ({ post }: { post: IPostDocument }) => {
  return (
    <div>
      <p className="my-3 px-4">{post?.description}</p>
      {post?.imageUrl && (
        <div className="w-full mx-auto">
          <Image
            src={post?.imageUrl}
            width={400}
            height={400}
            alt="post-image"
            className="w-full mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default PostContent;
