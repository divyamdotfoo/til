"use client";
import { signIn } from "next-auth/react";
import { PencilIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";
import { DiscordSvg, GithubSvg } from "../navbar";
import {} from "lucide-react";
import Link from "next/link";
export function SignInBtn() {
  const [hover, setHover] = useState(false);
  const handler = async () => {
    signIn();
  };
  return (
    <button
      onClick={handler}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className=" border-b border-dashed dark:border-primary flex items-center gap-1 text-xl font-medium tracking-tighter"
    >
      <motion.span className={`block ${hover ? " animate-drop-ball" : ""}`}>
        <PencilIcon className=" w-4 h-[14px]" />
      </motion.span>
      <span>Write now</span>
    </button>
  );
}

export function SignInGithub() {
  return (
    <Button className=" w-full">
      <Link
        href={`/api/auth/sigin/github`}
        className="flex items-center gap-4 "
      >
        <span className=" w-5 h-5">
          <GithubSvg />
        </span>
        <span className=" font-medium">Continue with Github</span>
      </Link>
    </Button>
  );
}

export function SignInDiscord() {
  return (
    <Button className="w-full">
      <Link href={""} className="flex items-center gap-4">
        <span className=" translate-x-1 w-5 h-5 block translate-y-[2px] ">
          <DiscordSvg />
        </span>
        <span className=" font-medium translate-x-[2px]">
          Continue with Discord
        </span>
      </Link>
    </Button>
  );
}
