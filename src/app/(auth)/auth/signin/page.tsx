import { auth, providerMap } from "@/auth";
import { SignInDiscord, SignInGithub } from "@/components/btns/sign-in";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className=" w-full h-full flex items-center justify-center ">
      <div className=" max-w-80">
        <h1 className=" text-7xl tracking-wide font-medium py-4">til</h1>
        <h2 className="text-xl font-medium opacity-80">
          Start sharing your journey with others. Its fun.
        </h2>
        <div className=" flex flex-col items-start gap-4 pt-12 pb-24">
          <SignInGithub />
          <SignInDiscord />
        </div>
      </div>
    </div>
  );
}
