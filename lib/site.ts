export const SITE_NAME = "Design It Live";
export const SITE_DESCRIPTION =
  "A self-paced system design course for developers: about six and a half hours of reading that follows one AI product from a 20-shop pilot to millions of orders.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
