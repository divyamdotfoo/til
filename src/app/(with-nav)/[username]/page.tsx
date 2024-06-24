import { SignOutBtn } from "@/components/btns/sign-out";
import { getUserProfile } from "@/actions";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const user = await getUserProfile(username);
  if (!user) notFound();

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <SignOutBtn />
    </div>
  );
}
