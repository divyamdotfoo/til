import { User } from "next-auth";
import Link from "next/link";
import { GithubSvg, LOGO } from "./ui/svgs";
import { ThemeBtn, UserBtn, SignInBtn, NewTil } from "@/components/btns";
export function Navbar({
  user,
  showAvatar,
}: {
  user?: { username: string | null } & User;
  showAvatar?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-4 w-full">
      <Link href={"/"} className=" cursor-pointer">
        <LOGO />
      </Link>
      <div className=" flex items-center gap-4 ">
        <NewTil />
        <ThemeBtn />
        {!user && <GithubLink />}
        {showAvatar === false ? null : user ? (
          <UserBtn user={user} />
        ) : (
          <SignInBtn />
        )}
      </div>
    </div>
  );
}

function GithubLink() {
  return (
    <Link
      href={"https://github.com/divyamdotfoo/til"}
      className=" w-5 h-5 block hover:scale-105 transition-all"
      target="_blank"
    >
      <GithubSvg classname=" fill-black dark:fill-white" />
    </Link>
  );
}
