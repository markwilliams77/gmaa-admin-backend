import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const config = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  ADMIN_GENERATION_SECRET: process.env.ADMIN_GENERATION_SECRET || "",
  PORT: process.env.PORT || "4000"
};
