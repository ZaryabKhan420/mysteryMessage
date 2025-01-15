import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(2, "UserName must be atleast 2 characters")
  .max(20, "UserName must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "UserName must not contain special character");

export const emailValidation = z.string().email({ message: "Invalid Email" });

export const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" });

export const signUpSchema = z.object({
  userName: userNameValidation,
  email: emailValidation,
  password: passwordValidation,
});
