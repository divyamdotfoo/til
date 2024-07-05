import { getTil } from "@/server/lib/til";
import { notFound } from "next/navigation";
import { TilUserInfo } from "@/components/til-card";
import { Separator } from "@/components/ui/separator";
import { UpvoteTil } from "@/components/btns/til";
import rehypePrismPlus from "rehype-prism-plus";
import { MDXRemote } from "next-mdx-remote/rsc";
import { removeHeading } from "@/lib/utils";
import { auth } from "@/auth";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await auth();
  const tilData = await getTil(id, session?.user.id);
  const til = tilData[0];
  const md = til?.content as string;
  if (!til) notFound();

  return (
    <div className="w-full flex items-center justify-center pt-2 pb-20">
      <div className=" max-w-3xl ">
        <h1 className=" text-center text-4xl font-bold pb-4">{til.title}</h1>
        <div className="max-w-md mx-auto flex items-center gap-3 pb-6 justify-center">
          <TilUserInfo
            data={{
              createdAt: til.createdAt,
              image: til.image,
              name: til.name,
              userId: til.userId,
              username: til.username,
            }}
            classname=" gap-3"
          />
          <Separator orientation="vertical" className=" h-5" />
          <UpvoteTil
            id={til.id}
            isVote={Boolean(til.isLiked)}
            upVotes={til.upvotes}
          />
        </div>
        <div className="prose dark:prose-invert prose-purple dark:prose-li:marker:text-white prose-li:marker:text-violet-900 transition-all prose-p:font-semibold prose-li:font-semibold">
          <MDXRemote
            source={removeHeading(md)}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypePrismPlus],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
