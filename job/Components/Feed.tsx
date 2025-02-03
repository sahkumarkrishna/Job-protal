import { getAllPosts } from "@/lib/serveractions";
import PostInput from "./PostInput";
import Posts from "./Posts";

const Feed = async ({ user }: { user: any }) => {
  const useData = JSON.parse(JSON.stringify(user)); // Use the passed `user` prop here

  const posts = await getAllPosts();

  return (
    <div className="flex-1">
      <PostInput user={useData} />
      <Posts posts={posts} />
    </div>
  );
};

export default Feed;
