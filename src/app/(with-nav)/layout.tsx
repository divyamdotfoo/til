import { auth } from "@/auth";
import { Navbar } from "@/components/navbar";
import React from "react";

export default async function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  return (
    <div className=" px-4 max-w-5xl mx-auto">
      <Navbar user={user} />
      {children}
    </div>
  );
}
