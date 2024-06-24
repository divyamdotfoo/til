import { auth } from "@/auth";
import { Navbar } from "@/components/navbar";
import { UserForm } from "@/components/new-user-form";
import { User } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const user = session.user as { username: string | null } & Required<User>;

  if (user.username && user.username.length) redirect("/");

  return (
    <div className=" px-4">
      <Navbar showAvatar={false} user={user} />
      <div className=" w-full pt-10 flex items-center justify-center md:justify-start">
        <UserForm data={user} />
      </div>
    </div>
  );
}
