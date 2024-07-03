import { auth } from "@/auth";
import { db } from "../db";
import { User, tils, users } from "../db/schema";
import { eq, or } from "drizzle-orm";

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
  const user = await db
    .select()
    .from(users)
    .where(or(eq(users.id, userIdOrName), eq(users.username, userIdOrName)))
    .leftJoin(tils, eq(users.id, tils.userId));
  if (!user.length) return null;
  return user[0];
};

export const isUserNameAvailable = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });
  if (!user) return true;
  else return false;
};
