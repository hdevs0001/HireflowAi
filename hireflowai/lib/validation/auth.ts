import { email, z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Minimum 3 characters required"),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters long")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number"),
});

export type signType = z.infer<typeof signupSchema>;

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(7),
});
