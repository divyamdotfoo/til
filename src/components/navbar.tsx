import { User } from "next-auth";
import { ThemeBtn } from "./btns/theme";
import { UserBtn } from "./btns/user";
import { SignInBtn } from "./btns/sign-in";
import Link from "next/link";
import { NewTil } from "./btns/new-til";
import { GithubSvg } from "./ui/svgs";

export function Navbar({
  user,
  showAvatar,
}: {
  user?: { username: string | null } & User;
  showAvatar?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 w-full">
      <Link href={"/"} className=" cursor-pointer">
        <h1 className={"font-medium text-5xl"}>til</h1>
      </Link>
      <div className=" flex items-center gap-4 ">
        {user && <NewTil />}
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
