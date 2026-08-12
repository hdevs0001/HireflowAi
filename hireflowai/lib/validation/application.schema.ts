import z, { email } from "zod";
export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "FullName must be at least 2 Characters")
    .max(40, "full Name is to o long"),

  email: z.email(),

  phoneNumber: z
    .string()
    .min(10, "Invaild phone Number")
    .max(10, "invalid phone Number"),
  resumeFile: z
    .instanceof(File, {
      message: "Resume file is Required",
    })
    .nullable(),

  widgetId: z.string().min(1, "Widget ID is required"),
  porigin: z.url(),
  // turnstileToken: z.string(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
