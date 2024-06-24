"use client";
import { signIn } from "next-auth/react";
import { Loader2, PencilIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";
import { DiscordSvg, GithubSvg } from "../navbar";
import {} from "lucide-react";
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
