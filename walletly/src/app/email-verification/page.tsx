"use client";

import { otpInputSchema, OtpInputType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStopwatch } from "react-icons/fa6";
import { IoIosMailUnread } from "react-icons/io";
import { motion } from "framer-motion";
import { getCookie } from "@/utilities";

const fields = [
  "otpInput1",
  "otpInput2",
  "otpInput3",
  "otpInput4",
  "otpInput5",
  "otpInput6",
] as const;

export default function EmailVerificationPage() {
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const expiryDateObj = useMemo(() => {
    const otpGenerationTime =
      getCookie("OtpGenerationTime") || new Date().getTime();
    const generationTimeDate = new Date(otpGenerationTime);
    const expiryDate = new Date();
    const expiresIn = 5; // mins
    expiryDate.setMinutes(generationTimeDate.getMinutes() + expiresIn);
    return expiryDate;
  }, []);

  const [pageHasMounted, setPageHasMounted] = useState(false);
  const [mins, setMins] = useState("05");
  const [secs, setSecs] = useState("00");
  const [expired, setExpired] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors, isSubmitted },
  } = useForm<OtpInputType>({
    resolver: zodResolver(otpInputSchema),
  });

  useEffect(() => {
    const change = () => {
      setPageHasMounted(true);
    };
    change();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const gap = (expiryDateObj.getTime() - new Date().getTime()) / 1000;

      setMins(() =>
        Math.floor(gap / 60)
          .toString()
          .padStart(2, "0"),
      );
      setSecs(() =>
        Math.floor(gap % 60)
          .toString()
          .padStart(2, "0"),
      );

      if (gap <= 1) {
        clearInterval(interval);
        setExpired(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [expiryDateObj]);

  useEffect(() => {
    const container = inputContainerRef.current;
    (container?.firstElementChild as HTMLElement)?.focus();

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const data = e.clipboardData?.getData("text");
      const containerChildren: Element[] = [
        ...(e.currentTarget as HTMLElement)?.children,
      ];
      if (!data) return;

      if (!/^\d+$/.test(data)) return;

      const splitData = data?.split("");

      containerChildren.forEach((child, idx) => {
        (child as HTMLInputElement).value = splitData[idx];
      });
    };

    container?.addEventListener("paste", handlePaste);

    return () => {
      container?.removeEventListener("paste", handlePaste);
    };
  }, [inputContainerRef]);

  useEffect(() => {}, [isValid]);

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
    const prevElem = (e.target as HTMLElement)
      .previousElementSibling as HTMLElement;

    const nextElem = (e.target as HTMLElement)
      .nextElementSibling as HTMLElement;
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

  const handleOnSubmit = () => {
    console.log("Submitted");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="form-wrapper2 md:p-10 md:w-fit w-full">
        <form
          action="javascript:void(0)"
          className="space-y-7"
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
              <span className="font-medium">chineduikechukwu@gmail.com</span>
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

          <p className="text-center text-white/70 md:font-light font-normal">
            Didn&apos;t recieve the code?{" "}
            <button
              className="text-primary font-semibold disabled:cursor-not-allowed disabled:line-through disabled:text-gray-600 transition-all"
              disabled={!expired}
            >
              Resend Code
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
