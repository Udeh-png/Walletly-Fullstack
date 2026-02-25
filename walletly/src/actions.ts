"use server";

import { SignupFormType } from "./types";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const submitSignupForm = async (data: SignupFormType) => {
  const cookieStore = await cookies();

  const res = await fetch("http://localhost:8080/api/sign-up/verify-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  const cookieOption: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
  };

  console.log(res);

  // if (tempUserId && email) {
  //   cookieStore.set("tempUserId", tempUserId, cookieOption);
  //   cookieStore.set("email", email, cookieOption);
  //   cookieStore.set(
  //     "generateTimestamp",
  //     otpGenerateTimestamp.toString(),
  //     cookieOption,
  //   );
  // }
};
