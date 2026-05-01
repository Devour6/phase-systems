import { Redis } from "@upstash/redis";

// Vercel's Upstash integration injects KV_REST_API_URL + KV_REST_API_TOKEN
// (legacy @vercel/kv naming). The Upstash SDK's fromEnv() looks for
// UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN, so we wire them by hand.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});
