import { getPosts } from "@/actions/post.actions";
import { auth, signOut } from "@/auth";
import { HomeNav } from "@/components/home-nav";
import LogoutButton from "@/components/logout-button";
import Posts from "@/components/posts";
import { PostProps } from "@/types/postType";
import Link from "next/link";

export const revalidate = 1;
export default async function Home() {
  const posts = await getPosts();
  if (posts.length == 0) {
    return (
      <div className="mt-[50px] flex flex-row gap-x-1">
        <p className="font-bold italic">No posts!! be the first one to post</p>
        😜{" "}
      </div>
    );
  }

  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
}
