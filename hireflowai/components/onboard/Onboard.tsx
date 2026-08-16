"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Building2, Mail, MapPin, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  companyNameSchema,
  emailSchema,
  onboardSchema,
} from "@/lib/validation/onboard";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

import { FormData } from "@/lib/validation/onboard";

const STEPS = [
  {
    key: "companyName",
    icon: Building2,
    title: "Welcome!",
    subtitle: "Let's get you set up with your new account.",
    label: "Company Name",
    placeholder: "Acme Inc.",
  },
  {
    key: "email",
    icon: Mail,
    title: "Stay in the loop",
    subtitle: "We'll send account updates to this address.",
    label: "Work Email",
    placeholder: "company@example.com",
  },
  {
    key: "address",
    icon: MapPin,
    title: "Almost there",
    subtitle: "This helps us tailor things to your region.",
    label: "Company Address",
    placeholder: "Optional",
  },
] as const;

export default function Onboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormData>({
    companyName: "",
    email: "",
    address: "",
  });

  // Pull the email from the logged-in session instead of asking for it
  useEffect(() => {
    if (session?.user?.email) {
      setForm((prev) => ({ ...prev, email: session.user!.email! }));
    }
  }, [session]);

  const total = STEPS.length;
  const current = STEPS[step - 1];
  const Icon = current.icon;
  const isEmailStep = current.key === "email";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  }

  function nextStep() {
    if (step === 1) {
      const result = companyNameSchema.safeParse({
        companyName: form.companyName,
      });

      if (!result.success) {
        setErrors({ companyName: result.error.issues[0].message });
        return;
      }
    }

    if (step === 2) {
      const result = emailSchema.safeParse({ email: form.email });

      if (!result.success) {
        setErrors({ email: result.error.issues[0].message });
        return;
      }
    }

    setStep((s) => Math.min(s + 1, total));
  }

  function previousStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function submit() {
    const result = onboardSchema.safeParse(form);

    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        errs[err.path[0].toString()] = err.message;
      });
      setErrors(errs);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message ?? "Account created successfully");
      router.push("/admin/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-[55vh]">
        <Card className="border-white/10 bg-[#050a18] shadow-2xl">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{current.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{current.subtitle}</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-white">
                  {current.label}
                </Label>
                <span className="text-xs text-slate-500">
                  Step {step} of {total}
                </span>
              </div>

              <Input
                name={current.key}
                value={form[current.key]}
                onChange={handleChange}
                placeholder={current.placeholder}
                readOnly={isEmailStep}
                disabled={isEmailStep}
                className="h-11 border-white/10 bg-black/40 text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-white/30 disabled:opacity-80 disabled:cursor-not-allowed"
              />

              {isEmailStep && (
                <p className="text-xs text-slate-500">
                  This is the email linked to your account.
                </p>
              )}

              {errors[current.key] && (
                <p className="text-sm text-red-500">{errors[current.key]}</p>
              )}
            </div>

            <Progress
              value={(step / total) * 100}
              className="h-1.5 bg-white/15 [&>div]:bg-white"
            />
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={loading}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < total ? (
              <Button
                onClick={nextStep}
                className="bg-white text-black hover:bg-slate-200"
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                disabled={loading}
                onClick={submit}
                className="bg-white text-black hover:bg-slate-200"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Creating..." : "Get Started"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}