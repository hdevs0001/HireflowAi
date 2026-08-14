// import { NextRequest, NextResponse } from "next/server";
// import { uploadResume } from "@/lib/uploadResume";
// import { extractText } from "unpdf";
// import getApplicatonData from "@/utils/getApplicationData";
// import validateWidget from "@/utils/validateWidget";
// import turnstileVerfication from "@/utils/turnstileVerfication";
// import resumeValidation from "@/utils/resumeValidation";
// import { ApiError } from "@/lib/error";
// import createCandidate from "@/utils/createCandidate";
// import deleteResume from "@/utils/deleteResume";
// import { resumeQueue } from "@/lib/queue/resume.queue";
// import { verifyBridgeToken } from "@/lib/candidate_session";
// import { prisma } from "@/prisma";

// export async function POST(req: NextRequest) {
//   try {
//     // app/api/widget/route.ts
//     const authHeader = req.headers.get("authorization");
//     const token = authHeader?.replace(/^Bearer\s+/i, "").trim();
//     if (!token) {
//       throw new ApiError(401, "Not authenticated");
//     }

//     const session = await verifyBridgeToken(token);
//     console.log("Session id ", session);
//     if (!session || !session.candidateId) {
//       throw new ApiError(401, "Invalid or expired authentication");
//     }

//     const { candidateId, companyId, widgetId, jobId } = session;
//     // Re-validate origin at submission time too — the bridge token proves
//     // WHO is submitting, not WHERE the request is actually coming from.
//     const validateWidgetFromSession = await prisma.widget.findUnique({
//       where: { id: widgetId },
//       select: { allowedDomains: true, isActive: true },
//     });

//     if (!validateWidgetFromSession || !validateWidgetFromSession.isActive) {
//       throw new ApiError(404, "Widget no longer available");
//     }

//     const formData = await req.formData();
//     const parsed = getApplicatonData(formData);

//     //  Check if it's missing, null, or an empty string

//     const origin = parsed.parentOrigin;
//     const widget = await validateWidget(widgetId, origin);

//     // await turnstileVerfication(parsed.turnstileToken);

//     //  BACKEND RESUME VALIDATION

//     const verifiedResume = resumeValidation(parsed.resumeFile);

//     // upload to the cloudinary and get the url to save in the database
//     //Add THIS IN TRY CATCH BLOCK

//     const upload = await uploadResume(verifiedResume);
//     // console.log(upload);

//     // CHECK FOR THE EXISTING USER EMAIL AND PHONENUMBER IF THERE THEN RETURN A RESPONSE USER EXISTS

//     try {
//       // const candidate = await createCandidate({
//       //   name: parsed.fullName,
//       //   email: parsed.email,
//       //   phone: parsed.phoneNumber,
//       //   resumePublicUrl: upload.url,
//       //   resumeUrl: upload.secure_url,
//       //   companyId: widget.companyId,
//       // });

//       await prisma.candidate.update({
//         where: { id: candidateId },
//         data: { phone: parsed.phoneNumber, name: parsed.fullName },
//       });

//       const application = await prisma.application.create({
//         data: {
//           candidateId,
//           companyId,
//           widgetId,
//           jobId,
//           resumeUrl: upload.secure_url,
//           resumePublicUrl: upload.url,
//         },
//       });
//       // start the bull_mq to build up the queue

//       // await resumeQueue.add("process-resume", {
//       //   candidateId: candidate.id,
//       //   resumeUrl: candidate.resumeUrl,
//       //   companyId: candidate.companyId,
//       // });
//     } catch (error) {
//       try {
//         await deleteResume(upload.public_id);
//       } catch (deleteError) {
//         console.error("Failed to delete orphaned resume:", deleteError);
//       }

//       throw error;
//     }

//     return NextResponse.json(
//       { message: "Application submit successfully " },
//       { status: 201 },
//     );
//   } catch (error) {
//     if (error instanceof ApiError) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: error.message,
//         },
//         {
//           status: error.status,
//         },
//       );
//     }

//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal server error",
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }
// app/api/widget/route.ts
import { NextRequest, NextResponse } from "next/server";
import { uploadResume } from "@/lib/uploadResume";
import getApplicatonData from "@/utils/getApplicationData";
import resumeValidation from "@/utils/resumeValidation";
import { ApiError } from "@/lib/error";
import deleteResume from "@/utils/deleteResume";
import { resumeQueue } from "@/lib/queue/resume.queue";
import { verifyBridgeToken } from "@/lib/candidate_session";
import { prisma } from "@/prisma";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      throw new ApiError(401, "Not authenticated");
    }

    const session = await verifyBridgeToken(token);
    if (!session || !session.candidateId) {
      throw new ApiError(401, "Invalid or expired authentication");
    }

    // session.widgetId is now the INTERNAL Widget.id — treat it as such everywhere below
    const { candidateId, companyId, widgetId, jobId } = session;

    // ONE lookup, by id — this replaces both the old validateWidgetFromSession
    // query AND the separate validateWidget(...) utility call.
    const widget = await prisma.widget.findUnique({
      where: { id: widgetId },
      select: { allowedDomains: true, isActive: true },
    });

    if (!widget || !widget.isActive) {
      throw new ApiError(404, "Widget no longer available");
    }

    const formData = await req.formData();
    const parsed = getApplicatonData(formData);

    if (
      !parsed.parentOrigin ||
      !widget.allowedDomains.includes(parsed.parentOrigin)
    ) {
      throw new ApiError(403, "Invalid widget origin");
    }

    const COOLDOWN_DAYS = 30;
    const recentApplication = await prisma.application.findFirst({
      where: { candidateId, jobId },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });

    if (recentApplication) {
      const daysSinceLastApplication =
        (Date.now() - recentApplication.createdAt.getTime()) /
        (1000 * 60 * 60 * 24);

      if (daysSinceLastApplication < COOLDOWN_DAYS) {
        const daysRemaining = Math.ceil(
          COOLDOWN_DAYS - daysSinceLastApplication,
        );
        throw new ApiError(
          409,
          `You already applied to this job. You can reapply in ${daysRemaining} day(s).`,
        );
      }
    }

    const verifiedResume = resumeValidation(parsed.resumeFile);
    const upload = await uploadResume(verifiedResume);

    try {
      await prisma.candidate.update({
        where: { id: candidateId },
        data: { phone: parsed.phoneNumber, name: parsed.fullName },
      });

      const application = await prisma.application.create({
        data: {
          candidateId,
          companyId,
          widgetId, // internal id, matches Widget.id — FK will resolve correctly now
          jobId,
          resumeUrl: upload.secure_url,
          resumePublicUrl: upload.url,
        },
      });

      // await resumeQueue.add("process-resume", {
      //   applicationId: application.id,
      //   candidateId,
      //   resumeUrl: application.resumeUrl,
      //   companyId,
      // });
    } catch (error) {
      try {
        await deleteResume(upload.public_id);
      } catch (deleteError) {
        console.error("Failed to delete orphaned resume:", deleteError);
      }
      throw error;
    }

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status },
      );
    }
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
