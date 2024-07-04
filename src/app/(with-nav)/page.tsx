import { auth } from "@/auth";
import { TilCard } from "@/components/til-card";
import { getAllTil } from "@/server/lib/til";

export default async function Page() {
  const session = await auth();
  const userId = session?.user.id ?? null;
  const tils = await getAllTil(userId);

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
