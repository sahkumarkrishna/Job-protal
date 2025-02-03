import Image from "next/image";
import React from "react";
import ProfilePhoto from "./Shared/ProfilePhoto";
import { getAllPosts } from "@/lib/serveractions";

// Define the User type for better type safety
interface User {
  imageUrl: string;
  firstName: string;
  lastName: string;
  username: string;
}

const LeftSidebar =async ({ user }: { user: User | null }) => {
  const posts= await getAllPosts()
  return (
    <div className="hidden md:block w-[20%] h-fit border border-gray-300 bg-white rounded-lg">
      <div className="flex flex-col items-center">
        <div className="w-full h-10 overflow-hidden">
          {user && (
            <Image
              src="/banner.jpg" // Reference to the image in the public directory
              alt="Banner"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}
        </div>
        <div className="my-1">
          {/* Fallback to a default image if user is not provided */}
          <ProfilePhoto src={user?.imageUrl} />
        </div>
        <div className="border-b border-b-gray-300">
          <div className="p-2 mt-5 text-center">
            <h1 className="font-bold hover:underline cursor-pointer">
              {user ? `${user.firstName} ${user.lastName}` : "Full Stack"}
            </h1>
            <p className="text-xs">@{user?.username || "username"}</p>
          </div>
        </div>
      </div>
      <div className="text-xs">
        <div className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer">
          <p>Post impression</p>
          <p className="text-blue-500 font-bold">88</p>
        </div>
        <div className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer">
          <p>Post</p>
          <p className="text-blue-500 font-bold">{posts.length}</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
