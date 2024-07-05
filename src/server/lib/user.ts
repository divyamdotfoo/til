import { auth } from "@/auth";
import { db } from "../db";
import { User, tils, upvotes, users } from "../db/schema";
import { and, eq, or, sql } from "drizzle-orm";

export const updateUserProfile = async (updatedUserData: Partial<User>) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return false;
  await db
    .update(users)
    .set(updatedUserData)
    .where(eq(users.id, session.user.id));

  return true;
};

export const getUserProfile = async (userIdOrName: string) => {
  const session = await auth();
  const authId = session?.user.id ?? null;
  if (!authId) {
    const userData = await db
      .select({
        author: users,
        til: {
          title: tils.title,
          upvotes: tils.upvotes,
          id: tils.id,
          createdAt: tils.createdAt,

          isLiked: sql<number>`false`.as("isLiked"),
        },
      })
      .from(users)
      .where(or(eq(users.id, userIdOrName), eq(users.username, userIdOrName)))
      .leftJoin(tils, eq(tils.userId, users.id))
      .all();
    if (!userData.length) return null;
    const author = userData[0].author;
    const authorTils = userData.map((row) => row.til).filter((n) => n != null);
    return { author, tils: authorTils };
  }
  const userData = await db
    .select({
      author: users,
      til: {
        title: tils.title,
        upvotes: tils.upvotes,
        id: tils.id,
        createdAt: tils.createdAt,

        isLiked: sql<number>`upvote.userId IS NOT NULL`.as("isLiked"),
      },
    })
    .from(users)
    .where(or(eq(users.id, userIdOrName), eq(users.username, userIdOrName)))
    .leftJoin(tils, eq(tils.userId, users.id))
    .leftJoin(
      upvotes,
      and(eq(upvotes.tilId, tils.id), eq(upvotes.userId, users.id))
    )
    .all();
  if (!userData.length) return null;
  const author = userData[0].author;
  const authorTils = userData.map((row) => row.til).filter((n) => n != null);
  return { author, tils: authorTils };
};

export const isUserNameAvailable = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });
  if (!user) return true;
  else return false;
};
