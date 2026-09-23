export default function HeroSection() {
  return (
    <section className="pt-32 pb-24 px-margin-desktop w-full relative z-10 max-w-container-max mx-auto">
<div className="flex flex-col items-center text-center max-w-4xl mx-auto relative">
<div className="absolute -top-32 -left-32 w-96 h-96 bg-hf-primary//5 rounded-[9999px] blur-3xl -z-10"></div>
<div className="absolute -top-24 -right-32 w-80 h-80 bg-hf-secondary//5 rounded-[9999px] blur-3xl -z-10"></div>
<span className="inline-block py-1.5 px-4 rounded-[9999px] bg-surface-container border border-outline-variant font-label-sm text-on-surface-variant uppercase tracking-wider mb-8">
              AI-assisted hiring, built around your workflow
            </span>
<h1 className="font-headline-xl text-[56px] leading-[64px] tracking-tight text-on-background mb-8 opacity-0 hf-animate-fade-in-up">
              From application to interview,
              <span className="text-hf-primary">without the busywork.</span>
</h1>
<p className="font-body-lg text-on-surface-variant max-w-3xl mb-10">
              Hireflow AI helps hiring teams create jobs, collect applications,
              evaluate candidates, manage hiring pipelines, and move the right
              people toward interviews from one place.
            </p>
<div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
<button className="bg-primary hover:bg-primary-fixed-variant text-on-primary font-label-md px-8 py-4 rounded-[0.5rem] hover:-translate-y-[2px] hover:shadow-lg hover:shadow-hf-primary//30 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-md w-full sm:w-auto">
                Get Started Free
              </button>
<button className="bg-surface hover:bg-surface-container border border-outline-variant text-on-surface font-label-md px-8 py-4 rounded-[0.5rem] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:shadow-md w-full sm:w-auto flex items-center justify-center gap-2">
                See How It Works
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
<div className="w-full relative group">
<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none rounded-[0.75rem]"></div>
<img alt="Hireflow AI Dashboard" className="w-full h-auto rounded-[0.75rem] shadow-2xl border border-outline-variant group-hover:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" src="https://lh3.googleusercontent.com/aida/AP1WRLvFPc0V4wsUMolKZKVJFKplhALEuzAMFUCgDuHaicSuGSnmiEIB7idY2DzSYC0krdZxaDzdppwjis34EpPboP5HR2_qRVhBUVARub7WkYmKidMXPN_dTZwALWqpsyBTp0GNygkidZ_2sM75cW-GWej-RaTmVt56h7lUZiA32w_a-aykIvGydbL89sdIqB0c6PwYaSwkzCl8dLa333RoHFMTQz7BYSQ44C92yv1raB4QfzG-Y5DiZQPtLPs"/>
</div>
<div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-hf-outline-variant//50">
<div className="flex items-center gap-2 text-hf-on-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
<span className="font-hf-body-sm">Easy to embed</span>
</div>
<div className="flex items-center gap-2 text-hf-on-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
<span className="font-hf-body-sm">AI-assisted evaluation</span>
</div>
<div className="flex items-center gap-2 text-hf-on-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
<span className="font-hf-body-sm">Candidate management</span>
</div>
<div className="flex items-center gap-2 text-hf-on-surface-variant">
<span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
<span className="font-hf-body-sm">Interview workflow</span>
</div>
</div>
</div>
</section>
  );
}
