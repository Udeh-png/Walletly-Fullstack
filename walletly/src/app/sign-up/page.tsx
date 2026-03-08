/* eslint-disable @next/next/no-img-element */
"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MultipleFieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { PasswordListItem } from "@/components/PasswordStrengthListItem";
import { passwordCriteria } from "@/data";
import { SignupFormType, signupSchema } from "@/types";
import { submitSignupForm } from "@/actions";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa6";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    criteriaMode: "all",
  });

  useEffect(() => {
    console.log(isSubmitting);
  }, [isSubmitting]);

  const passwordMeetsCriteria = (criteria: string) => {
    if (!isTouched) return false;

    const errorTypesArray: MultipleFieldErrors | undefined =
      errors?.password?.types;
    const errorType: string = errors?.password?.type || "";
    return !(
      (Array.isArray(errorTypesArray?.invalid_format) &&
        errorTypesArray?.invalid_format?.includes(criteria)) ||
      errorTypesArray?.invalid_format === criteria ||
      errorTypesArray?.[errorType] === criteria ||
      (Array.isArray(errorTypesArray?.[errorType]) &&
        (errorTypesArray?.[errorType] as string[]).includes(criteria))
    );
  };

  const onSubmit = async (data: SignupFormType) => {
    sessionStorage.setItem("pendingEmail", JSON.stringify(data.email));
    await submitSignupForm(data);
    console.log(
      sessionStorage.getItem("pendingEmail"),
      "pending email in session storage",
    );
  };

  return (
    <div className="grid lg:grid-cols-2 mx-auto gap-x-10">
      <div className="lg:flex hidden items-start flex-col gap-6">
        <motion.div
          initial={{ translateY: 100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "tween" }}
        >
          <img src="/images/logo.png" alt="" className="md:max-w-80 max-w-40" />
        </motion.div>
        <div className="">
          <motion.p
            className="text-5xl font-bold"
            initial={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: "tween", delay: 0.2 }}
          >
            Take <span className="text-primary">Control</span> Of Your Finance
          </motion.p>
          <motion.p
            className="text-xl text-gray-500 mt-4"
            initial={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: "tween", delay: 0.4 }}
          >
            The modern way to tract, manage, and grow your wealth with
            confidence. Join thousands today.
          </motion.p>
        </div>

        <div className="flex items-center gap-5">
          <motion.div
            className="flex"
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ type: "tween", delay: 0.5 }}
          >
            <div className="size-10 border-3 border-border rounded-full -mr-3 bg-red-500" />
            <div className="size-10 border-3 border-border rounded-full -mr-3 bg-green-500" />
            <div className="size-10 border-3 border-border rounded-full -mr-3 bg-blue-500" />
          </motion.div>

          <motion.p
            className="text-sm font-semibold text-gray-500"
            initial={{ translateX: 100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ type: "tween", delay: 0.5 }}
          >
            Trusted by 10k+ users
          </motion.p>
        </div>
      </div>
      <motion.div
        className="form-wrapper"
        initial={{
          translateX: "var(--slide-in-offset)",
          opacity: 0,
        }}
        animate={{
          translateX: 0,
          opacity: 1,
        }}
        transition={{
          type: "tween",
        }}
      >
        <form
          action=""
          className="flex flex-col md:gap-7 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <p className="text-3xl font-bold">Create Account</p>
            <p className="text-gray-400">Sign up in seconds to get started</p>
          </div>
          <div className="flex md:flex-row justify-between gap-x-4 gap-y-8">
            <div className="input-container w-full">
              <label htmlFor="first name" className="input-label">
                First Name
              </label>
              <input
                autoComplete=""
                type="text"
                id="first name"
                className={`form-input ${errors.firstName ? "ring-red-500! ring-2!" : ""}`}
                placeholder="John"
                {...register("firstName")}
              />

              {errors.firstName && (
                <p className="input-error-text">{errors.firstName.message}</p>
              )}
            </div>

            <div className="input-container w-full">
              <label htmlFor="last name" className="input-label">
                Last Name
              </label>
              <input
                autoComplete=""
                type="text"
                id="last name"
                className={`form-input ${errors.lastName ? "ring-red-500! ring-2!" : ""}`}
                placeholder="Doe"
                {...register("lastName")}
              />

              {errors.lastName && (
                <p className="input-error-text">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              autoComplete="email"
              type="email"
              id="email"
              className={`form-input ${errors.email ? "ring-red-500! ring-2!" : ""}`}
              placeholder="name@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="input-error-text">{errors.email.message}</p>
            )}
          </div>

          <div className={`input-container`}>
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="relative">
              <input
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                id="password"
                className={`form-input ${!passwordMeetsCriteria("REQUIRED") && isSubmitted ? "ring-red-500! ring-2!" : ""}`}
                placeholder="•••••••••••"
                {...register("password", {
                  onChange: () => {
                    if (!isTouched) setIsTouched(true);
                    trigger("password");
                  },
                })}
              />

              <label
                htmlFor="password"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                <button>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
              </label>
            </div>

            {!passwordMeetsCriteria("REQUIRED") && isSubmitted && (
              <p className="input-error-text">Password is Required</p>
            )}
            <div className="grid md:grid-cols-2 md:gap-2.5 gap-2 mt-2 text-sm">
              {passwordCriteria.map((criteria) => (
                <PasswordListItem
                  key={criteria.id}
                  criteria={criteria}
                  isValid={passwordMeetsCriteria(criteria.id)}
                />
              ))}
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="confirm password" className="input-label">
              Confirm Password
            </label>
            <div className="relative">
              <input
                autoComplete="new-password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm password"
                className={`form-input ${errors.confirmPassword ? "ring-red-500! ring-2!" : ""}`}
                placeholder="•••••••••••"
                {...register("confirmPassword")}
              />

              <label
                htmlFor="confirm password"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                <button>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>
            </div>

            {errors.confirmPassword && (
              <p className="input-error-text">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="button-primary"
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </div>

          <p className="mt-2 text-center text-sm text-gray-500 border-t border-border pt-5">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-medium underline">
              Login
            </a>
          </p>
        </form>
      </motion.div>

      {isSubmitting && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-10">
          <FaSpinner className="animate-spin text-primary text-5xl" />
        </div>
      )}
    </div>
  );
}

// shadow-[0_10px_30px_color-mix(in_srgb,var(--primary-color)_20%,transparent)]

{
  /* Adse123. */
}
