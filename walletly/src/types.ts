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
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
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

export const transferSchema = z
  .object({
    email: z.email().nullable().optional(),
    identifierType: z.enum(["ACCOUNT_NUMBER", "PHONE_NUMBER", "EMAIL_ADDRESS"]),
    identifier: z.string(),

    amount: z.string().min(1, "This field is required"),
    narration: z.string(),
  })
  .superRefine((data, ctx) => {
    const { identifierType, identifier } = data;

    if (identifier == "ACCOUNT_NUMBER") {
      ctx.addIssue({
        code: "custom",
        message: "Account number is required",
        path: ["identifier"],
      });
    }

    if (
      identifierType === "PHONE_NUMBER" &&
      !/^\+?\d{10,15}$/.test(identifier)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a valid phone number",
        path: ["identifier"],
      });
    }

    if (
      identifierType === "EMAIL_ADDRESS" &&
      !z.string().email().safeParse(identifier).success
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a valid email",
        path: ["identifier"],
      });
    }
  });

export type TransferType = z.infer<typeof transferSchema>;

declare global {
  interface Window {
    FlutterwaveCheckout: (payload: object) => null;
  }
}
