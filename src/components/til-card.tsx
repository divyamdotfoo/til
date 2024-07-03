import { TilCardData } from "@/server/db/schema";
import { UpvoteTil } from "./btns/til";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "./ui/separator";
import { getTimeSincePosted } from "@/lib/utils";

export function TilCard({ tilCardData }: { tilCardData: TilCardData }) {
  const { author, til } = tilCardData;
  return (
    <div className="px-4 flex flex-col gap-1 py-2 rounded-sm border-border transition-all border bg-card cursor-pointer shadow-md">
      <Link href={`/til/${til.id}`} prefetch>
        <p className=" text-lg font-semibold text-wrap tracking-tight hover:underline transition-all">
          {til.title}
        </p>
      </Link>
      <div className=" flex items-center justify-between">
        <UpvoteTil id={til.id} upVotes={til.upvotes} />
        <div className=" flex items-center gap-2">
          <Avatar className=" w-6 h-6 border-2 border-border shadow-sm">
            <AvatarFallback>{author.name[0].toUpperCase()}</AvatarFallback>
            <AvatarImage src={author.image ?? ""} />
          </Avatar>
          <Link
            href={`/${author.username ?? author.id}`}
            className=" hover:underline font-medium opacity-90 hover:opacity-100 transition-all"
          >
            {author.username ?? author.name}
          </Link>
          <Separator orientation="vertical" className=" h-5" />
          <p className=" text-sm font-medium opacity-90">
            {getTimeSincePosted(til.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
