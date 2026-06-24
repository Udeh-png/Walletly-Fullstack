import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;
  if (pathName === "/email-verification") {
    const isValidating = (await cookies()).get("regId");

    if (!isValidating) {
      return NextResponse.redirect(
        new URL("/sign-up?no-cookie-value", req.url),
      );
    }
  }

  if (pathName === "/dashboard") {
    const accessToken = (await cookies()).get("accessToken");
    const refreshToken = (await cookies()).get("refreshToken");
    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL("/sign-up", req.url));
    }
  }

  return NextResponse.next();
};
