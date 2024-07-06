import { UpvoteTil } from "@/components/btns";
import { TimeSincePosted } from "@/components/til-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UpvoteIconSolid } from "@/components/ui/svgs";
import { getDateForJoined } from "@/lib/utils";
import { getUserProfile } from "@/server/lib/user";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const userData = await getUserProfile(username);
  if (!userData) notFound();

  return (
    <div className=" max-w-4xl mx-auto">
      <div className="w-full grid md:grid-cols-4 grid-cols-1">
        <div className=" md:col-start-1 md:col-end-2">
          <div className=" flex  xs:items-center items-start gap-4 md:block">
            <Avatar className=" lg:w-52 lg:h-52 md:w-44 md:h-44 sm:w-28 sm:h-28 xs:h-24 xs:w-24 w-16 h-16 mb-4 border-2 border-border dark:border-white/40 shadow-md">
              <AvatarFallback className=" flex items-center justify-center">
                {userData.author.name[0].toUpperCase()}
              </AvatarFallback>
              <AvatarImage src={userData.author.image ?? ""} />
            </Avatar>
            <div>
              <h1 className=" text-2xl font-semibold">
                {userData.author.name}
              </h1>
              <h2 className=" font-light text-sm pb-2">
                @{userData.author.username}
              </h2>
            </div>
          </div>
          <p className=" text-pretty font-medium pb-3">{userData.author.bio}</p>
          <div className="flex items-start gap-4 md:block pb-4 md:pb-0">
            <p className=" flex items-center gap-1 pb-3">
              <span className="font-medium text-accent-foreground block">
                Upvotes:{" "}
              </span>
              <UpvoteIconSolid classname=" w-4 h-4" />
              <span className="font-medium block">
                {userData.author.upvotes}
              </span>
            </p>
            <p className="font-medium text-muted-foreground">
              Joined {getDateForJoined(userData.author.createdAt)}
            </p>
          </div>
        </div>
        <div className=" md:col-start-2 md:col-end-5 md:py-5 md:pl-10 ">
          {userData.tils.map((til) => (
            <div className=" flex items-center gap-4">
              <div className=" min-w-12">
                <UpvoteTil
                  id={til.id}
                  isVote={Boolean(til.isLiked)}
                  upVotes={til.upvotes}
                />
              </div>
              <div className=" flex items-center justify-between w-full">
                <Link
                  href={`/til/${til.id}`}
                  className="font-semibold text-pretty pr-2 tracking-tight hover:underline transition-all"
                >
                  {til.title}
                </Link>
                <TimeSincePosted dt={til.createdAt} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
