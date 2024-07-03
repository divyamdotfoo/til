"use client";
import { Loader2, PencilLine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { doesContainHeading, getMdLength } from "@/lib/utils";
import { useState } from "react";
import { addTil } from "@/server/actions";
import { FallbackProps, useErrorBoundary } from "react-error-boundary";
import { Label } from "@radix-ui/react-label";
export function NewTil() {
  return (
    <button className=" cursor-pointer">
      <Link href={"/editor"}>
        <PencilLine className=" w-5 h-5 hover:scale-105 transition-all" />
      </Link>
    </button>
  );
}

export function PostTil({ md }: { md: string }) {
  const [loading, setLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const router = useRouter();
  const session = useSession();
  const maxChar = 700;
  const count = getMdLength(md);
  const handleClick = async () => {
    if (session.status === "unauthenticated" && !session.data) {
      signIn();
      return;
    }
    const title = doesContainHeading(md);
    if (!title) {
      alert("true");
      return;
    }
    setLoading(true);
    try {
      await addTil({ title, content: md });
      setLoading(false);
      router.back();
    } catch (e) {
      console.log(e);
      setLoading(false);
      showBoundary("something went wrong");
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={count > maxChar}
      className=" px-4 flex items-center gap-1 rounded-sm bg-black dark:bg-primary hover:scale-[1.02] transition-all "
      size={"sm"}
    >
      <span className="font-semibold text-base">Post Til</span>
      {loading ? (
        <Loader2 className=" w-5 h-5 animate-spin" />
      ) : (
        <CircularProgress maxChar={maxChar} count={count} />
      )}
    </Button>
  );
}

const CircularProgress = ({
  maxChar,
  count,
}: {
  maxChar: number;
  count: number;
}) => {
  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(count / maxChar, 1));
  const width = 30;
  const height = 30;

  return (
    <div className="relative" style={{ width: width, height: height }}>
      {maxChar - count > 0 && maxChar - count < 20 ? (
        <span className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-yellow-500">
          {maxChar - count}
        </span>
      ) : null}
      {count >= maxChar && (
        <span className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] text-red-400">{`-${
          count - maxChar
        }`}</span>
      )}
      <svg width={width} height={height} className="-rotate-90">
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          strokeWidth={2}
          className=" stroke-gray-300"
          fill="none"
        ></circle>
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          strokeWidth={2}
          className={`${
            count <= maxChar
              ? maxChar - count < 20
                ? " stroke-yellow-500"
                : "stroke-til"
              : " stroke-red-400"
          }`}
          fill="none"
          style={{
            strokeDashoffset: dashOffset,
            strokeDasharray: circumference,
            transition: "stroke-dashoffset 0.3s ease",
          }}
        ></circle>
      </svg>
    </div>
  );
};

export const PostTilError = (props: FallbackProps) => {
  return (
    <div className=" flex flex-col gap-2">
      <Button
        className=" px-4 font-semibold"
        size={"sm"}
        onClick={props.resetErrorBoundary}
      >
        Try again
      </Button>
      <Label className="text-red-500 font-medium text-xs opacity-80">
        Something went wrong
      </Label>
    </div>
  );
};

export const UpvoteTil = ({ id, upVotes }: { id: string; upVotes: number }) => {
  const [isVoted, setVoted] = useState<boolean | null>(null);
  const session = useSession();
  const handler = () => {
    // if (session.status === "unauthenticated" || !session.data) {
    //   signIn();
    //   return;
    // }
    setVoted((p) => !p);
    // upvote(id);
  };
  return (
    <button
      onClick={handler}
      className=" flex items-start gap-2 hover:text-green-600 dark:hover:text-green-400 transition-all"
    >
      <span className="hover:bg-green-100 dark:hover:bg-[#1ddc6f3d] p-1 rounded-md">
        {isVoted ? (
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 pointer-events-none animate-in"
          >
            <path
              d="M13.234 3.395c.191.136.358.303.494.493l7.077 9.285a1.06 1.06 0 01-1.167 1.633l-4.277-1.284a1.06 1.06 0 00-1.355.866l-.814 5.701a1.06 1.06 0 01-1.05.911h-.281a1.06 1.06 0 01-1.05-.91l-.815-5.702a1.06 1.06 0 00-1.355-.866l-4.276 1.284a1.06 1.06 0 01-1.167-1.633l7.077-9.285a2.121 2.121 0 012.96-.493z"
              className=" fill-green-600"
              fill-rule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 pointer-events-none"
          >
            <path
              d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
              className=" fill-current"
              fill-rule="evenodd"
            ></path>
          </svg>
        )}
      </span>
      <p
        className={`font-semibold text-lg flex flex-col h-6 translate-y-[1px] overflow-hidden ${
          isVoted
            ? "opacity-100 dark:text-green-400 text-green-600"
            : "opacity-80"
        } `}
      >
        <span
          className={`${
            isVoted === true
              ? " -translate-y-7 transition-all"
              : isVoted === false
              ? "translate-y-0 transition-all"
              : ""
          }`}
        >
          {upVotes}
        </span>
        <span
          className={`${
            isVoted === true
              ? "-translate-y-7 transition-all"
              : isVoted === false
              ? "translate-y-0 transition-all"
              : ""
          }`}
        >
          {upVotes + 1}
        </span>
      </p>
    </button>
  );
};
