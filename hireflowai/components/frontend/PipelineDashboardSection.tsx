export default function PipelineDashboardSection() {
  return (
    <section className="py-24 px-margin-desktop w-full bg-surface-container-lowest border-t border-hf-outline-variant//50">
<div className="max-w-container-max mx-auto">
<div className="text-center mb-16">
<h2 className="font-headline-lg text-on-background mb-4 opacity-0 hf-animate-fade-in-up">
                See every candidate. Know what happens next.
              </h2>
<p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Visual pipelines keep your entire hiring team aligned on who is
                where in the process.
              </p>
</div>
{/*Pipeline Visualization*/}
<div className="w-full overflow-x-auto pb-8 snap-x">
<div className="flex gap-6 min-w-max px-4">
{/*Column 1: Applied*/}
<div className="w-80 bg-surface-container-low rounded-[0.75rem] p-4 flex flex-col gap-4 snap-center border border-hf-outline-variant//30">
<div className="flex justify-between items-center px-2">
<span className="font-label-md text-on-surface uppercase tracking-wider">Applied</span>
<span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-[9999px] text-xs font-bold">24</span>
</div>
<div className="bg-surface p-4 rounded-[0.5rem] shadow-sm border border-hf-outline-variant//50 cursor-pointer hover:border-primary hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="flex justify-between items-start mb-2">
<span className="font-label-md text-on-surface block">Sarah Jenkins</span>
<span className="text-xs font-bold text-on-secondary-container bg-secondary-container px-2 rounded-[9999px]">95%</span>
</div>
<span className="font-body-sm text-on-surface-variant block mb-3">Product Designer</span>
<div className="flex gap-2">
<span className="text-[10px] uppercase font-bold text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-[0.25rem]">Figma</span>
<span className="text-[10px] uppercase font-bold text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-[0.25rem]">UX</span>
</div>
</div>
<div className="bg-surface p-4 rounded-[0.5rem] shadow-sm border border-hf-outline-variant//50 cursor-pointer hover:border-primary hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="flex justify-between items-start mb-2">
<span className="font-label-md text-on-surface block">David Chen</span>
<span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2 rounded-[9999px]">78%</span>
</div>
<span className="font-body-sm text-on-surface-variant block mb-3">Product Designer</span>
</div>
</div>
{/*Column 2: Screening*/}
<div className="w-80 bg-surface-container-low rounded-[0.75rem] p-4 flex flex-col gap-4 snap-center border border-hf-outline-variant//30">
<div className="flex justify-between items-center px-2">
<span className="font-label-md text-on-surface uppercase tracking-wider">Screening</span>
<span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-[9999px] text-xs font-bold">8</span>
</div>
<div className="bg-surface p-4 rounded-[0.5rem] shadow-sm border border-hf-outline-variant//50 cursor-pointer hover:border-primary hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="flex justify-between items-start mb-2">
<span className="font-label-md text-on-surface block">Arjun Sharma</span>
<span className="text-xs font-bold text-on-secondary-container bg-secondary-container px-2 rounded-[9999px]">92%</span>
</div>
<span className="font-body-sm text-on-surface-variant block mb-3">Frontend Dev</span>
<div className="w-full bg-surface-container h-1 rounded-[9999px] overflow-hidden mt-2">
<div className="bg-primary h-full w-1/2"></div>
</div>
</div>
</div>
{/*Column 3: Interview*/}
<div className="w-80 bg-surface-container-low rounded-[0.75rem] p-4 flex flex-col gap-4 snap-center border border-hf-primary//20 bg-hf-primary//5">
<div className="flex justify-between items-center px-2">
<span className="font-label-md text-primary uppercase tracking-wider">Interview</span>
<span className="bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-[9999px] text-xs font-bold">3</span>
</div>
<div className="bg-surface p-4 rounded-[0.5rem] shadow-md border border-hf-primary//50 cursor-pointer relative overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-hf-primary"></div>
<div className="flex justify-between items-start mb-2">
<span className="font-label-md text-on-surface block">Emily Ross</span>
<span className="text-xs font-bold text-on-secondary-container bg-secondary-container px-2 rounded-[9999px]">98%</span>
</div>
<span className="font-body-sm text-on-surface-variant block mb-4">Senior Backend</span>
<div className="flex items-center gap-2 text-xs font-medium text-primary bg-hf-primary//10 p-2 rounded-[0.25rem]">
<span className="material-symbols-outlined text-[14px]">calendar_month</span>
                      Tomorrow, 10:00 AM
                    </div>
</div>
</div>
{/*Column 4: Offered*/}
<div className="w-80 bg-surface-container-low rounded-[0.75rem] p-4 flex flex-col gap-4 snap-center border border-hf-outline-variant//30 opacity-70">
<div className="flex justify-between items-center px-2">
<span className="font-label-md text-on-surface uppercase tracking-wider">Offered</span>
<span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-[9999px] text-xs font-bold">1</span>
</div>
<div className="bg-surface p-4 rounded-[0.5rem] shadow-sm border border-hf-outline-variant//50 cursor-pointer hover:border-primary hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="flex justify-between items-start mb-2">
<span className="font-label-md text-on-surface block">Michael Chang</span>
</div>
<span className="font-body-sm text-on-surface-variant block mb-3">DevOps Engineer</span>
</div>
</div>
</div>
</div>
{/*Full Dashboard Image*/}
</div>
</section>
  );
}
