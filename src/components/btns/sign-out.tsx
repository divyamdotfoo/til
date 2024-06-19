"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOutBtn() {
  const router = useRouter();
  const handler = async () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };
  return (
    <button onClick={handler} className=" border p-2 rounded-md">
      Sign out
    </button>
  );
}
