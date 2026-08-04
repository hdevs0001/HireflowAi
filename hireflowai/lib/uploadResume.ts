import { UploadApiResponse } from "cloudinary";
import cloudinary from "./cloudinary";
import { Readable } from "stream";

export async function uploadResume(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `hireflow/resume/`,
        resource_type: "raw",

        use_filename: true,
        unique_filename: true,
        filename_override: file.name,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          reject(new Error("Upload failed"));
          return;
        }
        resolve(result);
      },
    );
    Readable.from(buffer).pipe(uploadStream);
  });
}
