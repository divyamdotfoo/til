import { SignOutBtn } from "@/components/btns";
import { getUserProfile } from "@/server/lib/user";
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
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <p>
        {JSON.stringify(
          new Date(userData.author.createdAt).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })
        )}
      </p>
      <SignOutBtn />
    </div>
  );
}
