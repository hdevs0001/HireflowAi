export default function WidgetSection() {
  return (
    <section className="py-24 w-full bg-surface-container-low border-y border-hf-outline-variant//50 overflow-hidden">
<div className="max-w-container-max mx-auto px-hf-margin-desktop">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
<div>
<h2 className="font-headline-lg text-on-background mb-6 opacity-0 hf-animate-fade-in-up">
                  Your careers page. Your brand. Your application flow.
                </h2>
<p className="font-body-lg text-on-surface-variant mb-8">
                  Embed the Hireflow AI application widget directly onto your
                  existing website. Candidates get a seamless experience
                  uploading their resume and answering custom questions, while
                  you get perfectly structured data instantly synced to your
                  pipeline.
                </p>
<div className="flex gap-4">
<button className="bg-primary hover:bg-primary-fixed-variant text-on-primary font-label-md px-6 py-3 rounded-[0.5rem] shadow-sm hover:-translate-y-[2px] hover:shadow-lg hover:shadow-hf-primary//30 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    Get Started
                  </button>
<button className="bg-surface hover:bg-surface-container text-on-surface border border-outline-variant font-label-md px-6 py-3 rounded-[0.5rem] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] hover:shadow-md">
                    See Widget in Action
                  </button>
</div>
</div>
<div className="relative">
{/*Decorative blob*/}
<div className="absolute inset-0 bg-hf-primary//10 rounded-[9999px] blur-3xl transform scale-110"></div>
<div className="bg-surface rounded-[0.75rem] shadow-xl border border-outline-variant p-8 relative z-10">
<div className="flex items-center justify-between mb-8 pb-4 border-b border-hf-outline-variant">
<div className="w-24 h-6 bg-surface-container rounded-[0.25rem] animate-pulse"></div>
<span className="font-label-sm text-hf-on-surface-variant">Careers</span>
</div>
<h3 className="font-headline-md text-on-surface mb-2 opacity-0 hf-animate-fade-in-up">
                    Frontend Developer
                  </h3>
<p className="font-body-sm text-on-surface-variant mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">location_on</span>
                    Remote, US
                    <span className="material-symbols-outlined text-[16px] ml-2">work</span>
                    Full-time
                  </p>
<div className="bg-surface-container-low rounded-[0.5rem] border border-hf-outline-variant//50 border-dashed p-8 flex flex-col items-center justify-center text-center mb-6 hover:bg-surface-container transition-colors cursor-pointer">
<div className="w-12 h-12 bg-hf-primary//10 rounded-[9999px] flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-hf-primary">cloud_upload</span>
</div>
<span className="font-label-md text-on-surface block mb-1">Upload Resume (PDF)</span>
<span className="font-body-sm text-hf-on-surface-variant">Drag and drop or click to browse</span>
</div>
<button className="w-full bg-primary text-on-primary font-label-md py-3 rounded-[0.5rem] opacity-50 cursor-not-allowed">
                    Submit Application
                  </button>
</div>
</div>
</div>
</div>
</section>
  );
}
