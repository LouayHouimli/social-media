import { Separator } from "@/components/ui/separator";
import { FaHome } from "react-icons/fa";
import { IoCreateSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export async function HomeNav() {
  const session = await auth();
  return (
    <div>
      <Separator className="my-1 w-full" />
      <div className="flex h-5 items-center space-x-7 text-sm">
        <div className="flex items-center gap-x-2">
          <FaSearch className="w-5 h-5 text-primary" />
          <label htmlFor="" className="hidden lg:block">
            Search
          </label>
        </div>
        <Separator orientation="vertical" />
        <Link href="/">
          <div className="flex items-center gap-x-2  ">
            <FaHome className="w-5 h-5 text-primary" />
            <label htmlFor="" className="hidden lg:block">
              Home
            </label>
          </div>
        </Link>
        <Separator orientation="vertical" />
        <Link href="/create-post">
          <div className="flex items-center gap-x-2">
            <IoCreateSharp className="w-5 h-5 text-primary" />
            <label htmlFor="" className="hidden lg:block">
              Create
            </label>
          </div>
        </Link>
        <Separator orientation="vertical" />
        <Link href="/me">
          <div className="flex items-center gap-x-2 cursor-pointer">
            <Avatar className="w-5 h-5 border border-primary rounded-full">
              <AvatarImage
                src={
                  session?.user?.image ||
                  "https://avatars.githubusercontent.com/u/424443?v=4"
                }
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>{" "}
            <label className="hidden lg:block">{session?.user?.name}</label>
          </div>{" "}
        </Link>
      </div>
      <Separator className="my-2 w-full" />
    </div>
  );
}
