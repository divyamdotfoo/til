import { TilCard } from "@/components/til-card";
import { getAllTil } from "@/server/lib/til";

export default async function Page() {
  const tils = await getAllTil();

  return (
    <div className="">
      <div className=" flex flex-col w-full gap-2 py-8">
        {tils.map((til) => (
          <TilCard tilCardData={til} key={til.til.id} />
        ))}
      </div>
    </div>
  );
}
