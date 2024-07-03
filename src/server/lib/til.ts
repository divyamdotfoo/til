import { auth, checkAuth } from "@/auth";
import { db } from "../db";
import { Til, tils, users } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export const getTil = async (id: string) => {
  return db.query.tils.findFirst({
    where: (tils, { eq }) => eq(tils.id, id),
    with: {
      user: true,
    },
  });
};

export const addTil = async (til: Pick<Required<Til>, "title" | "content">) => {
  const session = await auth();
  if (!session || !session.user.id) throw new Error("Not logged in");
  const createdTil = await db
    .insert(tils)
    .values({
      title: til.title,
      userId: session.user.id,
      content: til.content,
      id: nanoid(12),
    })
    .returning();

  return createdTil[0];
};

export const incrementVote = async (postId: string) => {
  await checkAuth();
  db.update(tils)
    .set({ upvotes: sql`${tils.upvotes}+1` })
    .where(eq(tils.id, postId));
};

export const getAllTil = () => {
  return db.select().from(tils).innerJoin(users, eq(tils.userId, users.id));
};
