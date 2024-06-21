"use server";
import { db } from "@/drizzle/db";
import { Til, tils, users } from "@/drizzle/schema";
import { eq, or, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export const getUserProfile = async (userIdOrName: string) => {
  const user = await db
    .select()
    .from(users)
    .where(or(eq(users.id, userIdOrName), eq(users.username, userIdOrName)))
    .leftJoin(tils, eq(users.id, tils.userId));
  if (!user.length) return null;
  return user[0];
};

export const getTil = async (id: string) => {
  return db.query.tils.findFirst({
    where: (tils, { eq }) => eq(tils.id, id),
    with: {
      user: true,
    },
  });
};

export const isUserNameAvailable = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });
  if (!user) return true;
  else return false;
};

export const updateUsername = async (userId: string, userName: string) => {
  const isUsername = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, userName),
  });
  if (isUsername) throw new Error("username already exists");
  db.update(users).set({ username: userName }).where(eq(users.id, userId));
};

export const updateBio = async (userId: string, bio: string) => {
  db.update(users).set({ bio }).where(eq(users.id, userId));
};

export const addTil = async (
  userId: string,
  til: Pick<Required<Til>, "title" | "content">
) => {
  const createdTil = await db
    .insert(tils)
    .values({ title: til.title, userId, content: til.content, id: nanoid(12) })
    .returning();

  return createdTil[0];
};

export const incrementVote = (postId: string) => {
  db.update(tils)
    .set({ upvotes: sql`${tils.upvotes}+1` })
    .where(eq(tils.id, postId));
};
