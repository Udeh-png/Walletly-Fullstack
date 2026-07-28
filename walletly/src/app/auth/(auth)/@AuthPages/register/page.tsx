"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MultipleFieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef } from "react";
import { PasswordListItem } from "@/components/auth/PasswordStrengthListItem";
import { passwordCriteria } from "@/data";
import { SignupFormType, signupSchema } from "@/types";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormWrapper } from "@/components/auth/FormWrapper";
import { ErrorMessage } from "@/components/auth/ErrorMessage";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const errMsgRef = useRef<HTMLDivElement | null>(null);
  const [, setTime] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    criteriaMode: "all",
  });

  useEffect(() => {
    if (errMsgRef.current && errors.root) {
      errMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [errors.root]);

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
    const response = await fetch(
      "http://localhost:8080/api/auth/registration/initiate",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (response.status === 200) {
      localStorage.setItem("userEmail", data.email);
      setTime(() => {
        const time = new Date().getTime().toString();
        localStorage.setItem("otpRequestTimestamp", time || "0");
        return time;
      });
      redirect("/email-verification");
    }

    const error = await response.json();
    if (error) {
      setError("root", {
        message: error.message,
      });
    }
  };

  return (
    <div className="lg:mt-0 mt-5">
      <FormWrapper>
        <LoadingSpinner isLoading={isSubmitting} />
        <form
          action=""
          className="flex flex-col md:gap-7 gap-5 md:px-0 px-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <p className="text-3xl font-bold">Create Your Account</p>
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

              <button
                onClick={() => {
                  setShowPassword((prev) => !prev);
                  document.getElementById("password")?.focus();
                }}
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
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
            <label htmlFor="confirm-password" className="input-label">
              Confirm Password
            </label>
            <div className="relative">
              <input
                autoComplete="new-password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                className={`form-input ${errors.confirmPassword ? "ring-red-500! ring-2!" : ""}`}
                placeholder="•••••••••••"
                {...register("confirmPassword")}
              />

              <button
                onClick={() => {
                  setShowConfirmPassword((prev) => !prev);
                  document.getElementById("confirm-password")?.focus();
                }}
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
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

          <ErrorMessage
            condition={Boolean(errors.root)}
            message={errors.root?.message || ""}
          />

          <p className="mt-2 text-center text-sm border-t border-border-color pt-5 w-[80%] self-center">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-medium underline"
            >
              Login
            </Link>
          </p>
        </form>
      </FormWrapper>
    </div>
  );
}
