import { relations, sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import type { AdapterAccountType } from "next-auth/adapters";

export const accounts = sqliteTable(
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

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const users = sqliteTable("author", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(10)),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  bio: text("bio"),
  username: text("username"),
  upvotes: integer("upvotes").default(0),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => sql`(current_timestamp)`),
});

export const tils = sqliteTable("til", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(12)),
  title: text("title").notNull(),
  content: text("content", { mode: "json" }),
  upvotes: integer("upvotes").notNull().default(0),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => sql`(current_timestamp)`),
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

export type User = typeof users.$inferSelect;

export type Til = typeof tils.$inferSelect;

export type TilCardData = { author: User; til: Til };
