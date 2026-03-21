// BE\src\config\env.js
import "dotenv/config";

const requiredEnvVars = ["SUPABASE_URL", "SUPABASE_KEY"];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY
};
