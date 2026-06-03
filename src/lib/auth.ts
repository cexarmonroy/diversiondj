import "server-only";

import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";

const ADMIN_COOKIE = "diversiondj_admin";

function hashToken(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const expected = hashToken(password);
  const received = Buffer.from(token);
  const expectedBuf = Buffer.from(expected);

  if (received.length !== expectedBuf.length) return false;
  return timingSafeEqual(received, expectedBuf);
}

export async function setAdminSession() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD no configurada");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, hashToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export function verifyAdminPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const inputBuf = Buffer.from(input);
  const passwordBuf = Buffer.from(password);

  if (inputBuf.length !== passwordBuf.length) return false;
  return timingSafeEqual(inputBuf, passwordBuf);
}
