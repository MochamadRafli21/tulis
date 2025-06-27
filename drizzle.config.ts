import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/libs/database/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL || "",
  },
} satisfies Config;
