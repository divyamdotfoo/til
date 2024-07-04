import { getTil } from "@/server/lib/til";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { removeHeading } from "@/lib/utils";
import { TilUserInfo } from "@/components/til-card";
import { Separator } from "@/components/ui/separator";
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const til = await getTil(id);
  const md = til?.content as string;
  if (!til) notFound();
  return (
    <div className="w-full flex items-center justify-center pt-4 pb-20">
      <div className=" max-w-3xl prose dark:prose-invert prose-purple dark:prose-li:marker:text-white prose-li:marker:text-violet-900 transition-all prose-p:font-semibold prose-li:font-semibold ">
        <h1 className=" text-center mb-0 pb-0">{til.title}</h1>
        <div className=" max-w-md mx-auto flex items-center gap-3">
          <TilUserInfo
            data={{
              createdAt: til.createdAt,
              image: til.user.image,
              name: til.user.name,
              userId: til.userId,
              username: til.user.username,
            }}
            classname=" gap-3"
          />
          <Separator orientation="vertical" className=" h-5" />
        </div>

        <MDXRemote source={removeHeading(md)} />
      </div>
    </div>
  );
}
