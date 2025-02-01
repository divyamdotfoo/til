import { relations } from "drizzle-orm";
import {
  integer,
  text,
  primaryKey,
  pgTable,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import type { AdapterAccountType } from "next-auth/adapters";

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").defaultNow(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires").notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const users = pgTable("author", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(10)),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  bio: text("bio"),
  username: text("username"),
  upvotes: integer("upvotes").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tils = pgTable("til", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(12)),
  title: text("title").notNull(),
  content: jsonb("content"),
  upvotes: integer("upvotes").notNull().default(0),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  tils: many(tils),
}));

export const tilsRelations = relations(tils, ({ one }) => ({
  user: one(users, {
    fields: [tils.userId],
    references: [users.id],
  }),
}));

export const upvotes = pgTable("upvote", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(10)),
  userId: text("user_id").notNull(),
  tilId: text("til_id").notNull(),
});

export type User = typeof users.$inferSelect;

export type Til = typeof tils.$inferSelect;

export type TilCardData = Omit<Til, "content"> &
  Pick<User, "image" | "username" | "name"> & { isLiked: unknown };

export type TilPageData = Til &
  Pick<User, "username" | "name" | "image"> & { isLiked: unknown };
