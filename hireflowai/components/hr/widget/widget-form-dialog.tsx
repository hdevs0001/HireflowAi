"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";


interface Props {
  widget?: {
    id: string;
    widgetName: string | null;
    allowedDomains: string[];
  };
  trigger?: React.ReactElement;
}

export default function WidgetFormDialog({ widget, trigger }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [widgetName, setWidgetName] = useState(widget?.widgetName ?? "");
  const [domainsInput, setDomainsInput] = useState(widget?.allowedDomains.join(", ") ?? "");

  const isEdit = !!widget;

  async function handleSubmit() {
    if (!widgetName.trim()) {
      toast.error("Widget name is required");
      return;
    }

    const allowedDomains = domainsInput
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    setLoading(true);

    try {
      const res = await fetch(isEdit ? `/api/widgets/${widget.id}` : "/api/widgets", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ widgetName, allowedDomains }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save widget");
      }

      toast.success(isEdit ? "Widget updated" : "Widget created");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ?? (
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              Create Widget
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Widget" : "Create New Widget"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="widgetName">Widget Name</Label>
            <Input
              id="widgetName"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="e.g. Website Careers Page"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="domains">Allowed Domains</Label>
            <Input
              id="domains"
              value={domainsInput}
              onChange={(e) => setDomainsInput(e.target.value)}
              placeholder="example.com, careers.example.com"
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated. Controls which domains can embed this widget.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
            {isEdit ? "Save Changes" : "Create Widget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}