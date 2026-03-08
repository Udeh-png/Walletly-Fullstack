"use server";

import { SignupFormType } from "./types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const route = "http://localhost:8080/auth";

export const setOtpCookies = async (
  cookieStore: ReturnType<typeof import("next/headers").cookies>,
  tempUserId: string,
  otpGenerationTimestamp: number,
  email?: string,
) => {
  const cookie = await cookieStore;
  cookie.set("tempUserId", tempUserId, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 10, // 6 min
  });

  cookie.set("otpGenerationTimestamp", otpGenerationTimestamp.toString(), {
    maxAge: 60 * 10, // 5 min
  });

  if (email) {
    cookie.set("email", email, {
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 30, // 1hr
    });
  }
};

export const submitSignupForm = async (data: SignupFormType) => {
  console.log("Submitting Form data");
  const cookieStore = cookies();
  const { tempUserId, otpGenerationTimestamp } = await fetch(
    `${route}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  ).then((res) => res.json());

  if (tempUserId) {
    setOtpCookies(cookieStore, tempUserId, otpGenerationTimestamp, data.email);
  }

  redirect("/email-verification");
};

export const resendOtp = async (email: string) => {
  const cookieStore = cookies();
  const { tempUserId, otpGenerationTimestamp } = await fetch(
    `${route}/resend-otp/${email}`,
  ).then((res) => res.json());

  console.log(tempUserId, otpGenerationTimestamp);
  setOtpCookies(cookieStore, tempUserId, otpGenerationTimestamp);
};

export const verifyOtp = async (email: string) => {};
