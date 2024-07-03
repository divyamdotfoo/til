"use client";
import { signIn } from "next-auth/react";
import { Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { DiscordSvg, GithubSvg } from "../ui/svgs";
import { signOut } from "next-auth/react";

export function SignInBtn() {
  const [hover, setHover] = useState(false);
  const handler = async () => {
    signIn();
  };
  return (
    <Button
      variant={"outline"}
      onClick={handler}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className=" flex items-center gap-2 text-xs font-bold rounded-3xl py-1 text-muted-foreground hover:text-primary"
      size={"sm"}
    >
      <span>Log in</span>
      <LogIn className=" w-[14px] h-[14px]" />
    </Button>
  );
}

export function SignInGithub() {
  const [loader, setLoader] = useState(false);
  return (
    <Button
      className="flex items-center gap-4 w-full"
      onClick={() => {
        signIn("github");
        setLoader(true);
      }}
    >
      <span className=" w-5 h-5">
        {loader ? <Loader2 className=" animate-spin" /> : <GithubSvg />}
      </span>
      <span className=" font-medium">Continue with Github</span>
    </Button>
  );
}

export function SignInDiscord() {
  const [loader, setLoader] = useState(false);
  return (
    <Button
      className="w-full flex items-center gap-4"
      onClick={() => {
        signIn("discord");
        setLoader(true);
      }}
    >
      <span
        className={` w-5 h-5 block ${
          loader ? "" : " translate-x-1 translate-y-[2px]"
        }`}
      >
        {loader ? <Loader2 className=" animate-spin" /> : <DiscordSvg />}
      </span>
      <span className=" font-medium block translate-x-[2px]">
        Continue with Discord
      </span>
    </Button>
  );
}

export function SignOutBtn() {
  const handler = async () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };
  return (
    <button onClick={handler} className=" border p-2 rounded-md">
      Sign out
    </button>
  );
}
