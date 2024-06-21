"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "next-auth";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

export function UserBtn({
  user,
}: {
  user: { username: string | null } & User;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button>
          <Avatar className=" bg-black dark:bg-white w-7 h-7">
            <AvatarFallback>
              {user.name ? user.name[0].toUpperCase() : ""}
            </AvatarFallback>
            <AvatarImage src={user.image ?? ""} />
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 w-52">
        <button
          className=" flex items-center gap-4 px-4 py-2 w-full font-medium opacity-90 hover:opacity-100 transition-all"
          onClick={() => {
            router.push(`/${user.username ?? user.id ?? ""}`);
            setOpen(false);
          }}
        >
          <User2 className=" w-5 h-5" />
          <span>Profile</span>
        </button>
        <Separator />
        <button
          className=" flex items-center gap-4 px-4 py-2  w-full font-medium opacity-90 hover:opacity-100 transition-all"
          onClick={() => {
            signOut({ callbackUrl: "/", redirect: true });
          }}
        >
          <LogOut className=" w-5 h-5" />
          <span>Log out</span>
        </button>
      </PopoverContent>
    </Popover>
  );
}
