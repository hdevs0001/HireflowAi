import { getCandidateById } from "@/lib/queries/candidates";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import CandidateProfileHeader from "@/components/hr/candidate/candidate-profile-header";
import AIScorePanel from "@/components/hr/candidate/ai-score-panel";
import StatusChangeMenu from "@/components/hr/candidate/status-change-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InterviewStatusBadge from "@/components/hr/interviews/interview-status-badge";
import { format } from "date-fns";
import ScheduleInterviewDialog from "@/components/hr/candidate/schedule-interview-dialog";
import SendOfferButton from "@/components/hr/candidate/send-offer-button";

interface PageProps {
  params: Promise<{ candidateId: string }>; // holds an Application.id - see note above
}

export default async function CandidateProfilePage({ params }: PageProps) {
  const { candidateId: applicationId } = await params;

  const session = await auth();
  const companyId = session?.user?.companyId;

  if (!companyId) return <div>Unauthorized</div>;

  const application = await getCandidateById(applicationId, companyId);

  if (!application) {
    notFound();
  }

  return (
    <div className="space-y-6 p-4">
      <CandidateProfileHeader application={application} />

      <div className="grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2 space-y-5">
          <AIScorePanel evaluation={application.aiEvaluation} />

          <Card id="interviews">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Interviews</CardTitle>
              {application.candidateStatus === "INTERVIEWING" && (
                <ScheduleInterviewDialog applicationId={application.id} />
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {application.interviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No interviews yet.
                </p>
              ) : (
                application.interviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">
                        {interview.round.replace("_", " ")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {interview.interviewTime
                          ? format(
                              interview.interviewTime,
                              "MMM d, yyyy 'at' h:mm a",
                            )
                          : "Not scheduled"}
                        {interview.interviewerName &&
                          ` · ${interview.interviewerName}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <InterviewStatusBadge
                        status={interview.interViewStatus}
                      />
                      {interview.round === "FINAL" &&
                        interview.outcome === "PASS" &&
                        application.candidateStatus === "INTERVIEWING" && (
                          <SendOfferButton applicationId={application.id} />
                        )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Job</p>
                <p className="font-medium">{application.job.title}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Source</p>
                <p className="font-medium">
                  {application.widget.widgetName ?? "Untitled Widget"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Applied</p>
                <p className="font-medium">
                  {format(application.createdAt, "MMM d, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <StatusChangeMenu
                  applicationId={application.id}
                  currentStatus={application.candidateStatus}
                />
              </div>
              <div>
                <p className="text-muted-foreground">Next Action</p>
                <p
                  className={
                    application.nextAction.urgent
                      ? "text-red-600 font-medium"
                      : "font-medium"
                  }
                >
                  {application.nextAction.label}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
