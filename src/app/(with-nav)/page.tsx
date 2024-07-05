import { auth } from "@/auth";
import { TilCard } from "@/components/til-card";
import { getAllTil } from "@/server/lib/til";

export default async function Page() {
  const session = await auth();
  const userId = session?.user.id ?? null;
  const tils = await getAllTil(userId);
  // const tils = [
  //   {
  //     id: "KW2z3as165md",
  //     upvotes: 2,
  //     userId: "FjFp66GThl",
  //     username: "divyamgupta",
  //     title:
  //       " The greatest Formula in the world for ranking post on social media Apps to make this world happy place.",
  //     createdAt: "2024-07-03 16:55:38",
  //     image: "https://avatars.githubusercontent.com/u/148679569?v=4",
  //     name: "Divyam gupta",
  //     isLiked: 1,
  //   },
  //   {
  //     id: "F0nswx38UIGy",
  //     upvotes: 1,
  //     userId: "FjFp66GThl",
  //     username: "divyamgupta",
  //     title: "The stack",
  //     createdAt: "2024-07-04 12:12:03",
  //     image: "https://avatars.githubusercontent.com/u/148679569?v=4",
  //     name: "Divyam gupta",
  //     isLiked: 1,
  //   },
  //   {
  //     id: "s0WhiJBmmpGS",
  //     upvotes: 1,
  //     userId: "FjFp66GThl",
  //     username: "divyamgupta",
  //     title: "The stack",
  //     createdAt: "2024-07-04 13:28:38",
  //     image: "https://avatars.githubusercontent.com/u/148679569?v=4",
  //     name: "Divyam gupta",
  //     isLiked: 1,
  //   },
  // ];

  return (
    <div className="">
      <div className=" flex flex-col w-full gap-2 py-8">
        {tils.map((til) => (
          <TilCard tilCardData={til} key={til.id} />
        ))}
      </div>
    </div>
  );
}
