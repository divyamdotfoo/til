"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { BellDot, LogOut, Settings, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "next-auth";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { GithubSvg } from "../ui/svgs";
import Link from "next/link";

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
      <PopoverContent className="w-52 bg-card rounded-lg mt-2 border-border/30 p-0 overflow-hidden">
        <PopoverBtn
          onClick={() => {
            router.push(`/${user.username ?? user.id ?? ""}`);
            setOpen(false);
          }}
        >
          <User2 className=" w-4 h-4" />
          <span>Profile</span>
        </PopoverBtn>
        <Separator />
        <Link href={"/notifications"}>
          <PopoverBtn
            onClick={() => {
              setOpen(false);
            }}
          >
            <BellDot className=" w-4 h-4" />
            <span>Notifications</span>
          </PopoverBtn>
        </Link>
        <Separator />
        <PopoverBtn
          onClick={() => {
            setOpen(false);
          }}
        >
          <Settings className=" w-4 h-4" />
          <span>Settings</span>
        </PopoverBtn>
        <Separator />
        <PopoverBtn
          onClick={() => {
            signOut({ callbackUrl: "/", redirect: true });
            setOpen(false);
          }}
        >
          <LogOut className=" w-4 h-4" />
          <span>Log out</span>
        </PopoverBtn>
        <Separator />
        <Link href={"https://github.com/divyamdotfoo"} target="_blank">
          <PopoverBtn onClick={() => setOpen(false)}>
            <div className=" w-4 h-4">
              <GithubSvg classname=" fill-black dark:fill-white" />
            </div>
            <span>See on github</span>
          </PopoverBtn>
        </Link>
      </PopoverContent>
    </Popover>
  );
}

const PopoverBtn = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, children }) => {
  return (
    <button
      className=" flex items-center gap-2 px-4 py-2  w-full font-medium transition-all bg-background hover:bg-accent text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
});

PopoverBtn.displayName = "PopoverBtn";
