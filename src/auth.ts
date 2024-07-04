import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";
import { User, accounts, users } from "@/server/db/schema";
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

export const checkAuth = async () => {
  const session = await auth();
  if (!session || !session.user.id) throw new Error("unauthenticated");
  return session.user.id;
};
