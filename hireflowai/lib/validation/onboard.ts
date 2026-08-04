import { z } from "zod";

export const companyNameSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company name is required"),
});

export const emailSchema = z.object({
  email: z.email("Enter a valid email"),
});

export const onboardSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company name is required"),

  email: z.email(),

  address: z.string().optional(),
});

export type OnboardInput = z.infer<typeof onboardSchema>;

export type FormData = {
  companyName: string;
  email: string;
  address: string;
};