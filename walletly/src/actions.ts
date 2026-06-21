"use server";

import { SignupFormType } from "./types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const route = "http://localhost:8080/auth";

export const setOtpCookies = async (
  cookieStore: ReturnType<typeof import("next/headers").cookies>,
  otpGenerationTimestamp: number,
  email?: string,
) => {
  const cookie = await cookieStore;
  const val = Buffer.from("true").toString("base64");
  cookie.set("IsValidating", val, {
    maxAge: 60 * 10, // 6 min
  });

  cookie.set("otpGenerationTimestamp", otpGenerationTimestamp.toString(), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
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
  const cookieStore = cookies();
  const fetchData = await fetch(`${route}/register/initiate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await fetchData.json();

  if (!fetchData.ok) {
    return resData;
  }

  if (resData.otpGenerationTimestamp) {
    setOtpCookies(cookieStore, resData.otpGenerationTimestamp, data.email);
  }

  redirect("/email-verification");
};

export const resendOtp = async (email: string) => {
  const cookieStore = cookies();
  const response = await fetch(`${route}/resend-otp/${email}`);
  const resData = await response.json();

  if (resData.type === "SUSPENDED") {
    redirect("/sign-up?error=suspended");
  }

  if (!response.ok) return resData;

  if (resData.tempUserId && resData.otpGenerationTimestamp)
    setOtpCookies(cookieStore, resData.otpGenerationTimestamp);
};

export const verifyOtp = async (email: string, otp: string) => {
  const fetchData = await fetch(`${route}/validate-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await fetchData.json();

  if (!fetchData.ok) {
    const cookie = await cookies();
    cookie.delete("otpGenerationTimestamp");
    cookie.delete("IsValidating");
    cookie.delete("email");
    return data;
  }

  const cookieStore = await cookies();
  cookieStore.set("accessToken", `${data.type} ${data.accessToken}`);
  cookieStore.set("refreshToken", `${data.type} ${data.refreshToken}`);

  redirect("/dashboard");
};
