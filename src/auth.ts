import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzle/db";
import { User, accounts, users } from "./drizzle/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Discord({ allowDangerousEmailAccountLinking: true }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.username = (user as User).username;
      return session;
    },
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  pages: {
    signIn: "/auth/signin",
    newUser: "/",
  },
});
