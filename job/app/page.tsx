import Feed from "@/Components/Feed";
import LeftSidebar from "@/Components/LeftSidebar";
import News from "@/Components/News";
import { currentUser } from "@clerk/nextjs/server";


export default async function Home() {
  const user = await currentUser();

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
        {/* Left Sidebar */}
        <LeftSidebar user={user} />
        {/* Feed */}
        <Feed user={user} />
        {/* News */}
        <News />
      </div>
    </div>
  );
}
