import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(turso, { schema });

// type AsyncFunction = (...args: any[]) => Promise<any>;

// const createErrorHandledProxy = <T extends object>(target: T): T => {
//   return new Proxy(target, {
//     get: (obj, prop) => {
//       const key = prop as keyof typeof target;
//       const value = obj[key];
//       if (typeof value === "function") {
//         return async (...args: any[]) => {
//           try {
//             return await (value as AsyncFunction).apply(obj, args);
//           } catch (error) {
//             console.error(`${String(prop)} failed:`, error);
//             throw new Error(`${String(prop)} failed`);
//           }
//         };
//       }
//       return value;
//     },
//   });
// };

// export const user = createErrorHandledProxy(userMethods);
// export const til = createErrorHandledProxy(tilMethods);
