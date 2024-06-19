import { auth } from "@/auth";
import { SignInBtn } from "@/components/btns/sign-in";
import { getTil } from "./actions";
import { SignOutBtn } from "@/components/btns/sign-out";
export default async function Page() {
  const session = await auth();
  const til = await getTil("ksjfjd");
  if (!session) return <SignInBtn />;
  return (
    <div>
      <pre>{JSON.stringify(til, null, 2)}</pre>
      <SignOutBtn />
    </div>
  );
}
