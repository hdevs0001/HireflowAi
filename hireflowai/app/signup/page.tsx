"use client";

import { SignupForm } from "@/components/signup-form";
import { GalleryVerticalEndIcon } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:h-screen lg:overflow-hidden lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            HireFlow AI
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden min-w-0 overflow-hidden lg:block">
        {/* Background Video */}
        <video
          src="/video/Finaloutput.mp4"
          autoPlay
          // muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Blur Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-12 text-white">
          <span className="mb-3 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur-md">
            ✨ AI Recruitment Platform
          </span>

          <h1 className="max-w-xl text-5xl font-bold leading-tight">
            Hire the right talent
            <br />
            <span className="text-blue-300">10x faster.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-white/80">
            Automate resume screening, candidate evaluation, interview
            scheduling, and recruitment workflows with HireFlow AI.
          </p>

          <div className="mt-8 flex gap-8">
            <div>
              <h2 className="text-3xl font-bold">95%</h2>
              <p className="text-white/70">Faster Screening</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p className="text-white/70">Companies</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">24/7</h2>
              <p className="text-white/70">AI Assistant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
