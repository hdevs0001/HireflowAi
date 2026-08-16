// Dummy n8n webhook simulator. Swap the console.log + fake delay below for a
// real fetch() to your n8n webhook URL (e.g. process.env.N8N_INTERVIEW_WEBHOOK_URL)
// once you're ready to wire it up for real. Kept as a single module so there's
// exactly one place to flip from dummy to live.

interface InterviewInviteParams {
  candidateEmail: string;
  candidateName: string;
  jobTitle: string;
  round: string;
  interviewTime: Date;
  interviewLink: string;
}

interface OfferParams {
  candidateEmail: string;
  candidateName: string;
  jobTitle: string;
}

async function fakeDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendInterviewInviteEmail(params: InterviewInviteParams) {
  console.log("[n8n webhook - DUMMY] Interview invite email would be sent:", {
    to: params.candidateEmail,
    subject: `Interview scheduled: ${params.jobTitle}`,
    round: params.round,
    time: params.interviewTime,
    link: params.interviewLink,
  });

  await fakeDelay();
  return { success: true, dummy: true };
}

export async function sendOfferEmail(params: OfferParams) {
  console.log("[n8n webhook - DUMMY] Offer email would be sent:", {
    to: params.candidateEmail,
    subject: `Offer: ${params.jobTitle}`,
    candidate: params.candidateName,
  });

  await fakeDelay();
  return { success: true, dummy: true };
}