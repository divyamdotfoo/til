"use client";
import { signIn } from "next-auth/react";
export function SignInBtn() {
  const handler = async () => {
    signIn();
  };
  return (
    <button onClick={handler} className=" rounded-md p-2 border">
      TIL now
    </button>
  );
}
