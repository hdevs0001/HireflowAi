import { ApiError } from "@/lib/error";
import { applicationSchema } from "@/lib/validation/application.schema";

export default function getApplicatonData(formData: FormData) {
  const rawData = {
    fullName: formData.get("fullName"),
    phoneNumber: formData.get("phoneNumber"),
    resumeFile: formData.get("resumeFile"),
    parentOrigin: formData.get("parentOrigin"),
  };

  const result = applicationSchema.safeParse(rawData);
  if (!result.success) {
    throw new ApiError(400, "Invalid data");
  }
  return result.data;
}