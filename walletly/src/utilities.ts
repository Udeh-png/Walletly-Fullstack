"use client";

export function getCookie(name: string): string | undefined {
  const cookie = typeof document === "undefined" ? "" : document.cookie;
  const cookies = cookie.split(";");

  for (const cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (name === key) return val;
  }
  return;
}
