import { SignOutBtn } from "@/components/btns/sign-out";
import { getUserProfile } from "@/actions";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const user = await getUserProfile(username);
  if (!user) return <h1>we are not sure wht you are looking for</h1>;

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <SignOutBtn />
    </div>
  );
}
