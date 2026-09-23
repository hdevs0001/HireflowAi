export default function HowItWorksSection() {
  return (
    <section className="py-24 px-margin-desktop w-full bg-hf-background">
<div className="max-w-container-max mx-auto">
<div className="text-center mb-20">
<span className="font-label-md text-primary uppercase tracking-widest mb-4 block">The Process</span>
<h2 className="font-headline-lg text-on-background opacity-0 hf-animate-fade-in-up">
                A better hiring workflow.
              </h2>
</div>
<div className="relative">
{/*Connecting Line*/}
<div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-hf-outline-variant//30 z-0"></div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
{/*Step 1*/}
<div className="flex flex-col items-center text-center p-4 rounded-[0.75rem] hover:-translate-y-1 hover:shadow-md hover:bg-surface-container transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="w-24 h-24 bg-surface rounded-[9999px] shadow-md border-2 border-primary flex items-center justify-center mb-6 relative z-10">
<span className="font-headline-lg text-hf-primary">01</span>
</div>
<h3 className="font-headline-md text-on-surface mb-2 opacity-0 hf-animate-fade-in-up">
                    Create a Job
                  </h3>
<p className="font-body-sm text-hf-on-surface-variant">
                    Define role criteria, required skills, and experience level
                    in minutes.
                  </p>
</div>
{/*Step 2*/}
<div className="flex flex-col items-center text-center p-4 rounded-[0.75rem] hover:-translate-y-1 hover:shadow-md hover:bg-surface-container transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="w-24 h-24 bg-surface rounded-[9999px] shadow-md border-2 border-outline-variant flex items-center justify-center mb-6 relative z-10">
<span className="font-headline-lg text-hf-on-surface-variant">02</span>
</div>
<h3 className="font-headline-md text-on-surface mb-2 opacity-0 hf-animate-fade-in-up">
                    Collect Applications
                  </h3>
<p className="font-body-sm text-hf-on-surface-variant">
                    Use our embeddable widget to gather resumes directly on your
                    site.
                  </p>
</div>
{/*Step 3*/}
<div className="flex flex-col items-center text-center p-4 rounded-[0.75rem] hover:-translate-y-1 hover:shadow-md hover:bg-surface-container transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="w-24 h-24 bg-surface rounded-[9999px] shadow-md border-2 border-outline-variant flex items-center justify-center mb-6 relative z-10">
<span className="font-headline-lg text-hf-on-surface-variant">03</span>
</div>
<h3 className="font-headline-md text-on-surface mb-2 opacity-0 hf-animate-fade-in-up">
                    Evaluate Candidates
                  </h3>
<p className="font-body-sm text-hf-on-surface-variant">
                    AI-assisted scoring highlights top matches instantly based
                    on your criteria.
                  </p>
</div>
{/*Step 4*/}
<div className="flex flex-col items-center text-center p-4 rounded-[0.75rem] hover:-translate-y-1 hover:shadow-md hover:bg-surface-container transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="w-24 h-24 bg-surface rounded-[9999px] shadow-md border-2 border-outline-variant flex items-center justify-center mb-6 relative z-10">
<span className="font-headline-lg text-hf-on-surface-variant">04</span>
</div>
<h3 className="font-headline-md text-on-surface mb-2 opacity-0 hf-animate-fade-in-up">
                    Move to Interview
                  </h3>
<p className="font-body-sm text-hf-on-surface-variant">
                    Manage the pipeline and schedule interviews from a single
                    dashboard.
                  </p>
</div>
</div>
</div>
</div>
</section>
  );
}
