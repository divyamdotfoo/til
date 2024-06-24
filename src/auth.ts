import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzle/db";
import { User, accounts, users } from "./drizzle/schema";
import type { Provider } from "next-auth/providers";

export const providers: Provider[] = [
  GitHub({ allowDangerousEmailAccountLinking: true }),
  Discord({ allowDangerousEmailAccountLinking: true }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
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
    newUser: "/newuser",
  },
});

export const providerMap = new Map(
  providers.map((provider) => {
    if (typeof provider === "function") {
      const data = provider();
      return [data.name, data.id];
    } else {
      return [provider.name, provider.id];
    }
  })
);
