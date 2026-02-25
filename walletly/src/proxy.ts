import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;
  if (pathName === "/email-verification") {
    const tempUserId = (await cookies()).get("tempUserId")?.value;
    if (false) {
      return NextResponse.redirect(new URL("/sign-up", req.url));
    }
    const tempUserExists =
      false &&
      (await fetch("http://localhost:8080/auth/check-temp-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tempUserId }),
      }));

    if (tempUserExists) {
      return NextResponse.redirect(new URL("/sign-up", req.url));
    }
  }

  return NextResponse.next();
};
