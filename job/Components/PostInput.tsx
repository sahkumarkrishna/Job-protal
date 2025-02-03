"use client";
import React, { useState } from "react";
import ProfilePhoto from "./Shared/ProfilePhoto";
import { Input } from "./ui/input";
import { PostDialog } from "./PostDialog";

interface User {
  imageUrl: string;
  // Add other user properties as needed
}

interface PostInputProps {
  user: User;
}

const PostInput: React.FC<PostInputProps> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false); // Fix the useState syntax
  const inputHandler = () => {
    setOpen(true);
  };

  return (
    <div className="bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg">
      <div className="flex items-center gap-3">
        <ProfilePhoto src={user?.imageUrl} />
        <Input
          type="text"
          placeholder="Start a post"
          className="rounded-full hover:bg-gray-100 h-12 cursor-pointer"
          onClick={inputHandler}
        />
        <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl} />
      </div>
    </div>
  );
};

export default PostInput;
