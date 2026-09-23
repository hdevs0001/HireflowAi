"use client";

import { useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ProblemSection from "./ProblemSection";
import HowItWorksSection from "./HowItWorksSection";
import WidgetSection from "./WidgetSection";
import AiEvaluationSection from "./AiEvaluationSection";
import PipelineDashboardSection from "./PipelineDashboardSection";
import PricingSection from "./PricingSection";
import FinalCtaSection from "./FinalCtaSection";
import Footer from "./Footer";

export default function FrontendLandingPage() {
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-hireflow-landing] h1, [data-hireflow-landing] h2, [data-hireflow-landing] h3'
      )
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hf-animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    headings.forEach((element) => {
      element.classList.add("opacity-0");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-hireflow-landing
      className="min-h-screen w-full bg-hf-background font-hf-body-md text-hf-on-background"
    >
      <Navbar />
      <main className="pt-20 w-full">
        <div className="flex flex-col w-full bg-hf-background relative overflow-hidden">
          <HeroSection />
          <ProblemSection />
          <HowItWorksSection />
          <WidgetSection />
          <AiEvaluationSection />
          <PipelineDashboardSection />
          <PricingSection />
          <FinalCtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
