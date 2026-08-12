import { ApiError } from "@/lib/error";
import { applicationSchema } from "@/lib/validation/application.schema";

export default function getApplicatonData(formData: FormData) {
  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    resumeFile: formData.get("resumeFile"),
    widgetId: formData.get("widgetId"),
    porigin: formData.get("porigin"),
    // turnstileToken: formData.get("turnstileToken"),
  };
  const result = applicationSchema.safeParse(rawData);
  if (!result.success) {
    throw new ApiError(400, "inValid Data");
  }
  return result.data;
}
