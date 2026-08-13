import z from "zod";

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(40, "Full name is too long"),

  phoneNumber: z
    .string()
    .trim()
    .min(10, "Invalid phone number")
    .max(10, "Invalid phone number"),

  resumeFile: z.instanceof(File, {
    message: "Resume file is required",
  }),

  parentOrigin: z.url("Invalid origin"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;