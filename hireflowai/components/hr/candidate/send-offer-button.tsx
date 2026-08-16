"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Gift } from "lucide-react";
import { toast } from "sonner";

interface Props {
  applicationId: string;
}

export default function SendOfferButton({ applicationId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSendOffer() {
    setLoading(true);

    try {
      const res = await fetch(`/api/candidates/${applicationId}/offer`, { method: "POST" });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to send offer");
      }

      toast.success("Offer sent — candidate moved to Offered");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button size="sm" onClick={handleSendOffer} disabled={loading}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Gift className="mr-2 h-4 w-4" />}
      Send Offer
    </Button>
  );
}