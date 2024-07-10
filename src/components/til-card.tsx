import { TilCardData } from "@/server/db/schema";
import { UpvoteTil } from "./btns/til";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "./ui/separator";
import { getTimeSincePosted } from "@/lib/utils";

export function TilCard({ tilCardData }: { tilCardData: TilCardData }) {
  const isLikedByUser = Boolean(tilCardData.isLiked);
  return (
    <div className="px-4 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 py-2 transition-all bg-card/50 shadow-md">
      <div className=" flex items-center gap-4">
        <UpvoteTil
          id={tilCardData.id}
          upVotes={tilCardData.upvotes}
          isVote={isLikedByUser}
          classname="hidden md:flex"
        />
        <Link
          href={`/til/${tilCardData.id}`}
          prefetch
          className="font-semibold text-wrap tracking-tight hover:underline transition-all pr-4"
        >
          {tilCardData.title}
        </Link>
      </div>
      <div className=" flex items-center justify-between shrink-0 w-full md:w-auto">
        <UpvoteTil
          id={tilCardData.id}
          upVotes={tilCardData.upvotes}
          isVote={isLikedByUser}
          classname="md:hidden"
        />
        <TilUserInfo
          data={{
            createdAt: tilCardData.createdAt,
            image: tilCardData.image,
            name: tilCardData.name,
            userId: tilCardData.userId,
            username: tilCardData.username,
          }}
        />
      </div>
    </div>
  );
}

export function TilUserInfo({
  data,
  classname,
}: {
  data: Pick<
    TilCardData,
    "username" | "image" | "userId" | "name" | "createdAt"
  >;
  classname?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${classname}`}>
      <Avatar className=" w-5 h-5 border-2 border-border shadow-sm">
        <AvatarFallback>
          {data.username ? data.username[0].toUpperCase() : ""}
        </AvatarFallback>
        <AvatarImage src={data.image ?? ""} />
      </Avatar>
      <Link
        href={`/${data.username ?? data.userId}`}
        className=" hover:underline font-medium opacity-90 hover:opacity-100 transition-all text-sm"
      >
        {data.username ?? data.name}
      </Link>
      <Separator orientation="vertical" className=" h-5" />
      <TimeSincePosted dt={data.createdAt} />
    </div>
  );
}

export function TimeSincePosted({ dt }: { dt: string }) {
  return (
    <p className=" text-xs font-medium opacity-90 min-w-16">
      {getTimeSincePosted(dt)}
    </p>
  );
}
