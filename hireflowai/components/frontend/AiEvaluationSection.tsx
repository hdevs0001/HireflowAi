export default function AiEvaluationSection() {
  return (
    <section className="py-24 px-margin-desktop w-full bg-hf-background">
<div className="max-w-container-max mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
{/*Interactive Card UI*/}
<div className="order-2 lg:order-1 relative">
<div className="absolute -inset-4 bg-gradient-to-br from-hf-secondary//10 to-transparent rounded-[1.5rem] -z-10 blur-xl"></div>
<div className="bg-surface rounded-[0.75rem] shadow-lg border border-outline-variant overflow-hidden">
{/*Card Header*/}
<div className="p-6 border-b border-outline-variant flex justify-between items-start bg-hf-surface-bright">
<div className="flex items-center gap-4">
<div className="w-14 h-14 bg-surface-container rounded-[9999px] flex items-center justify-center overflow-hidden border border-hf-outline-variant">
<img className="w-full h-full object-cover" data-alt="Professional headshot portrait of a young male software developer, neutral background, modern lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjjssnVr7eMLIHST8g09EsbojdjD84evvZIX0s56gF3l4VoaQaRQl9JlXkA0eOxxXC1POL7ZoOmTYZwobR5qwmewQlnStBs1Xh2yL1Kr6V05OGY_Bigc6MoBKZjuWe0pdeEaK4mNFKp5ULpe6nnGfcyfQ3M00rC363Yv8HiskRA_7KcSepIaQ5KWZk854m7Nt0R-CUT1pTUJ254GqjE-1bbuio7hpOi5sgJjyqhYRhQmAPPMcRSmud"/>
</div>
<div>
<h3 className="font-headline-md text-on-surface m-0 opacity-0 hf-animate-fade-in-up">
                          Arjun Sharma
                        </h3>
<p className="font-body-sm text-on-surface-variant m-0">
                          Frontend Developer Applicant
                        </p>
</div>
</div>
<div className="flex flex-col items-end">
<span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-[9999px] font-hf-label-sm">
<span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                        92% Match
                      </span>
</div>
</div>
{/*Score Breakdown*/}
<div className="p-6 grid grid-cols-3 gap-4 border-b border-hf-outline-variant">
<div>
<span className="block font-label-sm text-on-surface-variant mb-1">Skills</span>
<div className="flex items-end gap-2">
<span className="font-headline-md text-on-surface leading-none">94%</span>
<div className="w-full bg-surface-container h-1.5 rounded-[9999px] mb-1">
<div className="bg-secondary h-1.5 rounded-[9999px] w-[94%]"></div>
</div>
</div>
</div>
<div>
<span className="block font-label-sm text-on-surface-variant mb-1">Experience</span>
<div className="flex items-end gap-2">
<span className="font-headline-md text-on-surface leading-none">88%</span>
<div className="w-full bg-surface-container h-1.5 rounded-[9999px] mb-1">
<div className="bg-secondary h-1.5 rounded-[9999px] w-[88%]"></div>
</div>
</div>
</div>
<div>
<span className="block font-label-sm text-on-surface-variant mb-1">Education</span>
<div className="flex items-end gap-2">
<span className="font-headline-md text-on-surface leading-none">96%</span>
<div className="w-full bg-surface-container h-1.5 rounded-[9999px] mb-1">
<div className="bg-secondary h-1.5 rounded-[9999px] w-[96%]"></div>
</div>
</div>
</div>
</div>
{/*Skills Match*/}
<div className="p-6">
<h4 className="font-label-md text-on-surface mb-3">
                      Matched Skills
                    </h4>
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2 py-1 bg-surface-container text-on-surface font-body-sm rounded-[0.25rem]">React</span>
<span className="px-2 py-1 bg-surface-container text-on-surface font-body-sm rounded-[0.25rem]">TypeScript</span>
<span className="px-2 py-1 bg-surface-container text-on-surface font-body-sm rounded-[0.25rem]">JavaScript</span>
<span className="px-2 py-1 bg-surface-container text-on-surface font-body-sm rounded-[0.25rem]">Node.js</span>
<span className="px-2 py-1 bg-surface-container text-on-surface font-body-sm rounded-[0.25rem]">Tailwind CSS</span>
</div>
<h4 className="font-label-md text-on-surface mb-3">
                      Missing Requirements
                    </h4>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-1 bg-error-container text-on-error-container font-body-sm rounded-[0.25rem] border border-hf-error//20">AWS (Preferred)</span>
</div>
</div>
</div>
</div>
{/*Text Content*/}
<div className="order-1 lg:order-2">
<h2 className="font-headline-lg text-on-background mb-6 opacity-0 hf-animate-fade-in-up">
                  Let AI handle the first pass.
                </h2>
<p className="font-body-lg text-on-surface-variant mb-6">
                  Stop reading hundreds of resumes to find the top 10%.
                  Hireflow's AI instantly analyzes incoming applications against
                  your job criteria, providing a clear match score and
                  breakdown.
                </p>
<div className="bg-surface-container-low p-4 rounded-[0.5rem] border-l-4 border-hf-primary">
<p className="font-body-sm text-on-surface-variant italic">
                    "AI helps surface useful candidate insights based purely on
                    the structured criteria you set. Your hiring team stays in
                    control of the final decision, completely avoiding automated
                    rejections."
                  </p>
</div>
</div>
</div>
</div>
</section>
  );
}
