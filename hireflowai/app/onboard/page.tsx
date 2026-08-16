import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Onboard from "@/components/onboard/Onboard"; // adjust path to wherever your client component actually lives

export default async function OnboardPage() {
  const session = await auth();

  // Not logged in at all - send to login
  if (!session || !session.user?.id) {
    redirect("/login");
  }

  // Already has a company - nothing to onboard, send to dashboard
  if (session.user.companyId) {
    redirect("/admin/dashboard");
  }

  // Logged in, no company yet - this is the only case that should see the form
  return <Onboard />;
}
