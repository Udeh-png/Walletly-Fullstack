import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;
  if (pathName === "/walletly/email-verification") {
    const tempUserId = (await cookies()).get("tempUserId")?.value;
    if (!tempUserId) {
      return NextResponse.redirect("/walletly/sign-up");
    }
  }

  return NextResponse.next();
};
