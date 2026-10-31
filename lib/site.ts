export const SITE_NAME = "Design It Live";
export const SITE_DESCRIPTION =
  "A weekend system design course for developers: six hours of reading that follows one AI product, DukaanVoice, from 20 shops to millions of orders.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
