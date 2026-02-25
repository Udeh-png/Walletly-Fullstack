"use server";

import { SignupFormType } from "./types";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";

export const submitSignupForm = async (data: SignupFormType) => {
  console.log("Submitting Form data");

  const cookieStore = await cookies();

  const { tempUserId, otpGenerationTimestamp } = await fetch(
    "http://localhost:8080/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  ).then((res) => res.json());

  const cookieOption: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
  };

  if (tempUserId) {
    cookieStore.set("tempUserId", tempUserId, cookieOption);
    cookieStore.set("email", data.email, cookieOption);
    cookieStore.set(
      "otpGenerationTimestamp",
      otpGenerationTimestamp.toString(),
      cookieOption,
    );
  }

  redirect("/email-verification");
};
