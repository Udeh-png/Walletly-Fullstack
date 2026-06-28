/* eslint-disable react-hooks/refs */
"use client";

import { otpInputSchema, OtpInputType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStopwatch } from "react-icons/fa6";
import { IoIosMailUnread } from "react-icons/io";
import { motion } from "framer-motion";
import { getCookie } from "@/utilities";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { redirect } from "next/navigation";

const fields = [
  "otpInput1",
  "otpInput2",
  "otpInput3",
  "otpInput4",
  "otpInput5",
  "otpInput6",
] as const; // with "as const", the type is created behind the scenes, as those exact string values,
//  rather than just string. This is important so it matches the type of the form data.

export default function EmailVerificationPage() {
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const userEmail = localStorage.getItem("userEmail") || "";
  const [pasted, setPasted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpRequestTimestamp, setOtpTimestamp] = useState(new Date().getTime());

  const expiryDateObj = useMemo(() => {
    const expiresIn = 60000; // 5 mins in ms
    return new Date(otpRequestTimestamp + expiresIn);
  }, [otpRequestTimestamp]);

  const [pageHasMounted, setPageHasMounted] = useState(false);
  const [mins, setMins] = useState("00");
  const [secs, setSecs] = useState("00");
  const [expired, setExpired] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    setValue,
    setFocus,
    formState: { errors, isSubmitted, isValid },
  } = useForm<OtpInputType>({
    resolver: zodResolver(otpInputSchema),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    const nextElem = e.target.nextElementSibling as HTMLElement;
    e.target.value = val;
    if (val && e.target.nextElementSibling) {
      nextElem.focus();
    }
    if (isSubmitted) {
      trigger();
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    const inputElem = e.target as HTMLInputElement;
    const prevElem = inputElem.previousElementSibling as HTMLElement;
    const nextElem = inputElem.nextElementSibling as HTMLElement;

    if ((e.key === "Backspace" || e.key === "ArrowLeft") && prevElem) {
      await new Promise(() => {
        setTimeout(() => {
          prevElem.focus();
        }, 10);
      });
    } else if (e.key === "ArrowRight" && nextElem) {
      await new Promise(() => {
        setTimeout(() => {
          nextElem.focus();
        }, 10);
      });
    }
  };

  const verifyOtp = async (value: string) => {
    return await fetch("http://localhost:8080/api/auth/register/verify", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: value }),
    });
  };

  const resendOtp = async (email: string) => {
    return await fetch("http://localhost:8080/api/auth/resend-otp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  };

  const handleOnSubmit = async () => {
    const inputContainer = inputContainerRef.current;
    console.log("called handleOnSubmit");
    if (inputContainer) {
      const children = Array.from(inputContainer.children);

      const values = children
        .map((child) => (child as HTMLInputElement).value)
        .join("");

      setIsLoading(true);
      const response = await verifyOtp(values);
      setIsLoading(false);

      if (response.status === 200) {
        redirect("/dashboard");
      }

      const error = await response.json();

      setError("root", {
        message: error.message,
      });
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    const response = await resendOtp(userEmail);
    setIsLoading(false);
    if (response.status !== 200) {
      const error = await response.json();

      setError("root", error.message);
      return;
    }

    const otpTimestamp =
      Number(getCookie("otpGenerationTimestamp")) || new Date().getTime();
    setOtpTimestamp(otpTimestamp);
    setExpired(false);
  };

  useEffect(() => {
    const change = () => {
      setPageHasMounted(true);
    };
    change();
  }, []); // set page mounted

  useEffect(() => {
    const interval = setInterval(() => {
      const gap = (expiryDateObj.getTime() - new Date().getTime()) / 1000;

      if (gap <= 1) {
        setMins("00");
        setSecs("00");
        clearInterval(interval);
        setExpired(true);
      }

      setMins(() =>
        Math.max(Math.floor(gap / 60))
          .toString()
          .padStart(2, "0"),
      );
      setSecs(() =>
        Math.max(Math.floor(gap % 60))
          .toString()
          .padStart(2, "0"),
      );
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [expiryDateObj]); // timer interval

  useEffect(() => {
    const container = inputContainerRef.current;
    (container?.firstElementChild as HTMLElement)?.focus();
  }, []); // focus on first input

  useEffect(() => {
    const container = inputContainerRef.current;
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const data = e.clipboardData?.getData("text");
      const containerChildren: Element[] = [
        ...(e.currentTarget as HTMLElement)?.children,
      ];
      if (!data) return;

      if (!/^\d+$/.test(data)) return;

      const splitData = data?.split("");

      containerChildren.forEach((_, idx) => {
        setValue(`otpInput${idx + 1}` as keyof OtpInputType, splitData[idx]);
      });

      setPasted(true);
      setFocus("otpInput6");
    };

    container?.addEventListener("paste", handlePaste);

    return () => {
      container?.removeEventListener("paste", handlePaste);
    };
  }, [inputContainerRef, setValue, setFocus]); // past event listener

  useEffect(() => {
    const form = formRef.current;
    if (pasted || isValid) {
      form?.requestSubmit();
    }
  }, [isValid, pasted]); // auto-submit

  return (
    <div className="flex items-center justify-center">
      <div className="form-wrapper2 md:p-10 md:w-fit w-full">
        <form
          action="javascript:void(0)"
          className="space-y-7"
          ref={formRef}
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className="flex flex-col items-center gap-5">
            <div className="p-2 bg-primary rounded-[0.6rem] w-fit text-3xl shadow-[0_5px_20px_color-mix(in_srgb,var(--primary-color)_40%,transparent)]">
              <IoIosMailUnread />
            </div>

            <p className="text-3xl font-bold">Verify Account</p>
            <div className="text-center">
              <p className="text-white/70 md:font-light font-normal">
                We&apos;ve sent a 6-digit verification code to
              </p>
              <span className="font-medium block h-6.5">{userEmail}</span>
            </div>
          </div>

          <div className="w-full">
            <div
              className="flex md:gap-5 justify-between"
              ref={inputContainerRef}
            >
              {fields.map((field, i) => {
                const { onChange, ...rest } = register(field);
                return (
                  <motion.input
                    animate={errors[field] ? { translateX: [0, 5, -5, 0] } : {}}
                    transition={{
                      type: "tween",
                    }}
                    key={i}
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    inputMode="numeric"
                    type="text"
                    maxLength={1}
                    placeholder="•"
                    className={`otp-input ${errors[field] ? "border-red-500!" : ""}`}
                    onFocus={(e) => {
                      const inputElem = e.target as HTMLInputElement;
                      const end = inputElem.value.length;
                      inputElem.setSelectionRange(end, end);
                    }}
                    onKeyDown={handleKeyPress}
                    {...rest}
                    onChange={(e) => {
                      onChange(e);
                      handleChange(e);
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1 justify-center text-white/70 text-sm -mt-5">
            <FaStopwatch />
            <p>{`${mins}:${secs}`}</p>
          </div>

          <div className="">
            <input
              type="submit"
              className="button-primary"
              value={"Verify"}
              disabled={!pageHasMounted}
            />
          </div>
        </form>

        <p className="text-center text-white/70 md:font-light font-normal mt-7">
          Didn&apos;t recieve the code?{" "}
          <button
            className="text-primary font-semibold disabled:cursor-not-allowed disabled:line-through disabled:text-gray-600 transition-all cursor-pointer"
            disabled={!expired}
            onClick={handleResendOtp}
          >
            Resend Code
          </button>
        </p>

        {errors.root && <p>{errors.root.message}</p>}
      </div>

      {isLoading && <LoadingSpinner />}
    </div>
  );
}
