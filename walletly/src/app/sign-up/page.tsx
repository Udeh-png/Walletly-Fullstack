/* eslint-disable @next/next/no-img-element */
"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MultipleFieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PasswordListItem } from "@/components/PasswordStrengthListItem";
import { passwordCriteria } from "@/data";
import { SignupFormType, signupSchema } from "@/types";
import { submitSignupForm } from "@/actions";
import { FaShieldHeart } from "react-icons/fa6";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    criteriaMode: "all",
  });

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

  const onSubmit = (data: SignupFormType) => {
    sessionStorage.setItem("pendingEmail", JSON.stringify(data.email));
    submitSignupForm(data);
    console.log(
      sessionStorage.getItem("pendingEmail"),
      "pending email in session storage",
    );
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center pt-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img src="/images/logo.png" alt="" className="md:w-20 w-40 mb-10" />
      <h1 className="md:text-4xl text-3xl font-semibold mb-2 text-center">
        Take{" "}
        <span className="text-primary text-shadow-[0_0_8px_var(--primary-color)]">
          Control
        </span>{" "}
        Of Your Finance
      </h1>
      <p className="text-center md:text-base text-sm">
        Sign up in seconds — manage money with confidence.
      </p>

      <form
        action=""
        className="lg:min-w-[60%] min-w-[90%] mt-5 flex flex-col gap-8"
      >
        <div className="input-container">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`form-input ${errors.email ? "ring-red-500! ring-2!" : ""}`}
            placeholder="Enter email address"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className={`input-container`}>
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`form-input ${!passwordMeetsCriteria("REQUIRED") && isSubmitted ? "ring-red-500! ring-2!" : ""}`}
              placeholder="Enter your password"
              {...register("password", {
                onChange: () => {
                  if (!isTouched) setIsTouched(true);
                  trigger("password");
                },
              })}
            />

            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
            >
              {showPassword ? (
                <FaEyeSlash className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
              ) : (
                <FaEye className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
              )}
            </button>
          </div>

          {!passwordMeetsCriteria("REQUIRED") && isSubmitted && (
            <p className="text-red-500 text-sm mt-1">Password is Required</p>
          )}
          <div className="grid md:grid-cols-2 md:gap-4 gap-2 mt-2 text-sm">
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
              type={showConfirmPassword ? "text" : "password"}
              id="confirm password"
              className={`form-input ${errors.confirmPassword ? "ring-red-500! ring-2!" : ""}`}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />

            <button
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              type="button"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
              ) : (
                <FaEye className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
              )}
            </button>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-between gap-x-4 gap-y-8">
          <div className="input-container w-full">
            <label htmlFor="first name" className="input-label">
              First Name
            </label>
            <input
              type="text"
              id="first name"
              className={`form-input ${errors.firstName ? "ring-red-500! ring-2!" : ""}`}
              placeholder="Enter your first name"
              {...register("firstName")}
            />

            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="input-container w-full">
            <label htmlFor="last name" className="input-label">
              Last Name
            </label>
            <input
              type="text"
              id="last name"
              className={`form-input ${errors.lastName ? "ring-red-500! ring-2!" : ""}`}
              placeholder="Enter your last name"
              {...register("lastName")}
            />

            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-xl bg-primary p-4 text-white font-medium hover:bg-primary/90 transition duration-200 cursor-pointer shadow-[0_10px_20px_2px_color-mix(in_srgb,var(--primary-color)_30%,transparent)]"
          >
            Sign Up
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-primary font-medium underline">
          Login
        </a>
      </p>
    </div>
  );
}
