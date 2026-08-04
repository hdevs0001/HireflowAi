import cloudinary from "@/lib/cloudinary";

export default async function deleteResume(publicId: string) {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
  });

  if (result.result !== "ok") {
    throw new Error(
      `Failed to delete resume from Cloudinary: ${result.result}`,
    );
  }

  return result;
}
