import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;
  if (pathName === "/email-verification") {
    const hasActiveRegSession = (await cookies()).get("regId");

    if (!hasActiveRegSession) {
      return NextResponse.redirect(
        new URL("/auth/register?no-cookie-value", req.url),
      );
    }
  }

  if (pathName === "/dashboard") {
    const accessToken = (await cookies()).get("ACCESS_TOKEN");
    const refreshToken = (await cookies()).get("REFRESH_TOKEN");
    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
};
