export default function ProblemSection() {
  return (
    <section className="py-24 px-margin-desktop w-full bg-surface-container-low border-y border-hf-outline-variant//50">
<div className="max-w-container-max mx-auto">
<div className="text-center mb-16">
<h2 className="font-headline-lg text-on-background mb-4 opacity-0 hf-animate-fade-in-up">
                Hiring gets messy fast.
              </h2>
<p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Traditional hiring is a patchwork of tools, manual screening,
                and lost context.
              </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/*Problem 1*/}
<div className="bg-surface p-8 rounded-[0.75rem] shadow-sm border border-outline-variant relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="absolute top-0 left-0 w-full h-1 bg-hf-error//80"></div>
<div className="w-12 h-12 bg-error-container rounded-[0.5rem] flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-hf-on-error-container">inbox_customize</span>
</div>
<h3 className="font-headline-md text-on-surface mb-3 opacity-0 hf-animate-fade-in-up">
                  Too Many Applications
                </h3>
<p className="font-body-sm text-hf-on-surface-variant">
                  Great candidates get buried in overflowing inboxes. Finding
                  the right fit feels like finding a needle in a haystack.
                </p>
</div>
{/*Problem 2*/}
<div className="bg-surface p-8 rounded-[0.75rem] shadow-sm border border-outline-variant relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="absolute top-0 left-0 w-full h-1 bg-hf-tertiary//80"></div>
<div className="w-12 h-12 bg-surface-container-high rounded-[0.5rem] flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-hf-on-surface">search_insights</span>
</div>
<h3 className="font-headline-md text-on-surface mb-3 opacity-0 hf-animate-fade-in-up">
                  Manual Screening
                </h3>
<p className="font-body-sm text-hf-on-surface-variant">
                  Hours wasted reading through unqualified resumes. The initial
                  screening process is slow, biased, and inefficient.
                </p>
</div>
{/*Problem 3*/}
<div className="bg-surface p-8 rounded-[0.75rem] shadow-sm border border-outline-variant relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="absolute top-0 left-0 w-full h-1 bg-hf-outline//80"></div>
<div className="w-12 h-12 bg-surface-container-high rounded-[0.5rem] flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-hf-on-surface">cable</span>
</div>
<h3 className="font-headline-md text-on-surface mb-3 opacity-0 hf-animate-fade-in-up">
                  Disconnected Tools
                </h3>
<p className="font-body-sm text-hf-on-surface-variant">
                  Jumping between email, spreadsheets, and clunky legacy ATS
                  systems leads to dropped balls and poor candidate experience.
                </p>
</div>
</div>
<div className="mt-16 text-center">
<p className="font-headline-md text-primary inline-flex items-center gap-2">
                Hireflow AI connects the flow.
                <span className="material-symbols-outlined">trending_flat</span>
</p>
</div>
</div>
</section>
  );
}
