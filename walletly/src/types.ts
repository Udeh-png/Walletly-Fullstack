import z from "zod";

export const signupSchema = z
  .object({
    email: z.email().min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "REQUIRED" })
      .min(8, "MIN_LENGTH")
      .regex(/[A-Z]/, "UPPERCASE")
      .regex(/[a-z]/, "LOWERCASE")
      .regex(/[0-9]/, "NUMBER")
      .regex(/[^A-Za-z0-9]/, "SPECIAL_CHARACTER"),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof signupSchema>;

export const otpInputSchema = z.object({
  otpInput1: z.string().min(1).regex(/\d/),
  otpInput2: z.string().min(1).regex(/\d/),
  otpInput3: z.string().min(1).regex(/\d/),
  otpInput4: z.string().min(1).regex(/\d/),
  otpInput5: z.string().min(1).regex(/\d/),
  otpInput6: z.string().min(1).regex(/\d/),
});

export type OtpInputType = z.infer<typeof otpInputSchema>;

export const loginSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LogInType = z.infer<typeof loginSchema>;
