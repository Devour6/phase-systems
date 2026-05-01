import { Redis } from "@upstash/redis";

// Upstash auto-injects KV_REST_API_URL + KV_REST_API_TOKEN via the Vercel
// integration. fromEnv() reads them automatically.
export const redis = Redis.fromEnv();
