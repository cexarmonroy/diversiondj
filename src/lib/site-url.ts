const PRODUCTION_URL = "https://diversiondj.vercel.app";

export function getSiteUrl() {
  const fallback =
    process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000";
  return (process.env.SITE_URL || fallback).replace(/\/$/, "");
}
