import { auth, checkAuth } from "@/auth";
import { db } from "../db";
import {
  Til,
  TilCardData,
  TilPageData,
  tils,
  upvotes,
  users,
} from "../db/schema";
import { and, eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export const getTil = async (
  id: string,
  authId: string | null | undefined
): Promise<TilPageData[]> => {
  if (!authId)
    return db
      .select({
        id: tils.id,
        title: tils.title,
        userId: tils.userId,
        upvotes: tils.upvotes,
        createdAt: tils.createdAt,
        content: tils.content,

        name: users.name,
        username: users.username,
        image: users.image,

        isLiked: sql`false`.as("isLiked"),
      })
      .from(tils)
      .where(eq(tils.id, id))
      .innerJoin(users, eq(tils.userId, users.id));

  return db
    .select({
      id: tils.id,
      title: tils.title,
      userId: tils.userId,
      upvotes: tils.upvotes,
      createdAt: tils.createdAt,
      content: tils.content,

      name: users.name,
      username: users.username,
      image: users.image,

      isLiked: sql`upvote.userId IS NOT NULL`.as("isLiked"),
    })
    .from(tils)
    .where(eq(tils.id, id))
    .innerJoin(users, eq(tils.userId, users.id))
    .leftJoin(upvotes, and(eq(upvotes.userId, authId), eq(upvotes.tilId, id)));
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
  incrementVote(createdTil[0].id);
  return createdTil[0];
};

export const incrementVote = async (tilId: string) => {
  const userId = await checkAuth();
  await db.transaction(async (tx) => {
    await tx
      .update(tils)
      .set({ upvotes: sql`${tils.upvotes}+1` })
      .where(eq(tils.id, tilId));
    await tx.insert(upvotes).values({ userId, tilId });
  });
};

export const decrementVote = async (tilId: string) => {
  const userId = await checkAuth();
  await db.transaction(async (tx) => {
    await tx
      .update(tils)
      .set({ upvotes: sql`${tils.upvotes}-1` })
      .where(eq(tils.id, tilId));
    await tx
      .delete(upvotes)
      .where(and(eq(upvotes.userId, userId), eq(upvotes.tilId, tilId)));
  });
};

export const getAllTil = async (
  userId: string | null
): Promise<TilCardData[]> => {
  if (!userId) {
    return db
      .select({
        id: tils.id,
        upvotes: tils.upvotes,
        userId: tils.userId,
        username: users.username,
        title: tils.title,
        createdAt: tils.createdAt,
        image: users.image,
        name: users.name,
        isLiked: sql`false`.as("isLiked"),
      })
      .from(tils)
      .innerJoin(users, eq(tils.userId, users.id));
  } else {
    return db
      .select({
        id: tils.id,
        upvotes: tils.upvotes,
        userId: tils.userId,
        username: users.username,
        title: tils.title,
        createdAt: tils.createdAt,
        image: users.image,
        name: users.name,
        isLiked: sql`upvote.userId IS NOT NULL`.as("isLiked"),
      })
      .from(tils)
      .innerJoin(users, eq(tils.userId, users.id))
      .leftJoin(
        upvotes,
        and(eq(upvotes.tilId, tils.id), eq(upvotes.userId, userId))
      );
  }
};
