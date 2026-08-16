"use client";

import { FormWrapper } from "@/components/auth/FormWrapper";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordFieldWithChecks } from "@/components/auth/PasswordFieldWIthChecks";

import { SignupFormType, signupSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialSpinner } from "@/components/shared/MaterialSpinner";

export default function ResetPassword() {
  const {
    register,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    criteriaMode: "all",
  });

  return (
    <FormWrapper>
      <h1 className="text-3xl  font-semibold mb-5">Reset your password</h1>
      <form className="md:px-0 px-1 pb-5">
        <div className="space-y-5">
          <PasswordFieldWithChecks
            passwordErrors={errors.password}
            isSubmitted={isSubmitted}
            register={register}
            trigger={trigger}
          />

          <div className="input-container">
            <label htmlFor="confirm-password" className="input-label">
              Confirm Password
            </label>

            <PasswordInput
              id="confirm-password"
              elementId="confirm-password"
              error={Boolean(errors.confirmPassword)}
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="input-error-text">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="button-primary flex items-center justify-center gap-x-2 disabled:brightness-75 disabled:cursor-default!"
              disabled={false}
            >
              <p className="relative">
                Reset Password
                <AnimatePresence>
                  {false && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="size-3.75 absolute left-[120%] top-1/2 -translate-y-1/2"
                    >
                      <MaterialSpinner sizeInPx={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </p>
            </button>
          </div>
        </div>
      </form>
    </FormWrapper>
  );
}
