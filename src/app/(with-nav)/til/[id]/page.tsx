import { getTil } from "@/actions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const til = await getTil(id);
  if (!til) notFound();
  return (
    <div>
      <pre>{JSON.stringify(til, null, 2)}</pre>
    </div>
  );
}
