import { NextRequest, NextResponse } from "next/server";
import { uploadResume } from "@/lib/uploadResume";
import { extractText } from "unpdf";
import getApplicatonData from "@/utils/getApplicationData";
import validateWidget from "@/utils/validateWidget";
import turnstileVerfication from "@/utils/turnstileVerfication";
import resumeValidation from "@/utils/resumeValidation";
import { ApiError } from "@/lib/error";
import createCandidate from "@/utils/createCandidate";
import deleteResume from "@/utils/deleteResume";
import { resumeQueue } from "@/lib/queue/resume.queue";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const parsed = getApplicatonData(formData);
    // const parsed = result.data;

    //  Check if it's missing, null, or an empty string
    const origin = req.headers.get("origin");
    const widget = await validateWidget(parsed.widgetId, origin);

    await turnstileVerfication(parsed.turnstileToken);

    //  BACKEND RESUME VALIDATION

    const verifiedResume = resumeValidation(parsed.resumeFile);

    // upload to the cloudinary and get the url to save in the database
    //Add THIS IN TRY CATCH BLOCK

    const upload = await uploadResume(verifiedResume);
    console.log(upload);

    // const response = await fetch(upload.secure_url);

    // if (!response.ok) {
    //   throw new Error(`Failed to download PDF: ${response.status}`);
    // }

    //   const bytes = await response.arrayBuffer();

    //   const uint8Array = new Uint8Array(bytes);

    //   const text = await extractText(uint8Array);
    // const resumeText = text.text.join("\n");

    // const cleanedText = resumeText
    //   .replace(/\r\n/g, "\n")
    //   .replace(/[ \t]+/g, " ")
    //   .replace(/\n{3,}/g, "\n\n")
    //   .trim();

    // console.log(cleanedText);

    //  create the client/candidate in the database also check for the existing user if there

    // CHECK FOR THE EXISTING USER EMAIL AND PHONENUMBER IF THERE THEN RETURN A RESPONSE USER EXISTS

    try {
      const candidate = await createCandidate({
        name: parsed.fullName,
        email: parsed.email,
        phone: parsed.phoneNumber,
        resumePublicUrl: upload.url,
        resumeUrl: upload.secure_url,
        companyId: widget.companyId,
      });
      // start the bull_mq to build up the queue

      await resumeQueue.add("process-resume", {
        candidateId: candidate.id,
        resumeUrl: candidate.resumeUrl,
        companyId: candidate.companyId,
      });
    } catch (error) {
      try {
        await deleteResume(upload.public_id);
      } catch (deleteError) {
        console.error("Failed to delete orphaned resume:", deleteError);
      }

      throw error;
    }

    return NextResponse.json(
      { message: "Application submit successfully" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.status,
        },
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
