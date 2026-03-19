import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;
  if (pathName === "/email-verification") {
    const tempUserId = (await cookies()).get("tempUserId")?.value;

    if (!tempUserId) {
      return NextResponse.redirect(
        new URL("/sign-up?No-Temp-user-id", req.url),
      );
    }

    const checkForTempUser = await fetch(
      `http://localhost:8080/auth/authorize-otp-page-access/${tempUserId}`,
    );

    if (!checkForTempUser.ok) {
      return NextResponse.redirect(new URL("/sign-up?Check-not-ok", req.url));
    }
  }

  return NextResponse.next();
};
