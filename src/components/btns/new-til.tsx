"use client";

import { PencilLine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NewTil() {
  const router = useRouter();
  return (
    <button className=" cursor-pointer">
      <Link href={"/editor"}>
        <PencilLine className=" w-5 h-5 hover:scale-105 transition-all" />
      </Link>
    </button>
  );
}
