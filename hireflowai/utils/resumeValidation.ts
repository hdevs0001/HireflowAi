import { ApiError } from "@/lib/error";

const MAX_SIZE_MB = 1;

export default function resumeValidation(resume: File | null) {
  if (
    !resume ||
    !(resume instanceof File) ||
    resume.size === 0
  ) {
    throw new ApiError(
      400,
      "Please attach the resume",
    );
  }

  const isPdfMime =
    resume.type === "application/pdf";

  const isPdfExtension =
    resume.name.toLowerCase().endsWith(".pdf");

  if (!isPdfMime || !isPdfExtension) {
    throw new ApiError(
      400,
      "Resume must be a PDF file",
    );
  }

  const sizeMB =
    resume.size / (1024 * 1024);

  if (sizeMB > MAX_SIZE_MB) {
    throw new ApiError(
      400,
      `File must be under ${MAX_SIZE_MB}MB.`,
    );
  }

  return resume;
}