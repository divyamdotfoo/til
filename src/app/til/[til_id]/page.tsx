import { getTil } from "@/app/actions";

export default async function Page({ params }: { params: { til_id: string } }) {
  const { til_id: id } = params;
  const til = await getTil(id);
  return (
    <div>
      <pre>{JSON.stringify(til, null, 2)}</pre>
    </div>
  );
}
