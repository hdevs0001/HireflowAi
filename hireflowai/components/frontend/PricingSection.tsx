export default function PricingSection() {
  return (
    <section className="py-24 px-margin-desktop w-full bg-surface-container-low border-t border-hf-outline-variant">
<div className="max-w-container-max mx-auto">
<div className="text-center mb-16">
<h2 className="font-headline-lg text-on-background mb-4 opacity-0 hf-animate-fade-in-up">
                Simple, transparent pricing.
              </h2>
<p className="font-body-lg text-hf-on-surface-variant">
                Scale your hiring without scaling your costs.
              </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
{/*Starter*/}
<div className="bg-surface rounded-[1rem] p-8 border border-outline-variant shadow-sm flex flex-col hover:scale-[1.01] hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<h3 className="font-headline-md text-on-surface mb-2 opacity-0 hf-animate-fade-in-up">
                  Starter
                </h3>
<p className="font-body-sm text-on-surface-variant mb-6 h-10">
                  Perfect for small teams making their first hires.
                </p>
<div className="mb-8">
<span className="font-headline-xl text-hf-on-surface">$49</span>
<span className="font-body-sm text-hf-on-surface-variant">/mo</span>
</div>
<button className="w-full py-3 px-4 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md rounded-[0.5rem] mb-8 transition-colors border border-outline-variant hover:-translate-y-[2px] hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  Start Free Trial
                </button>
<ul className="flex flex-col gap-4 flex-grow">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-hf-on-surface-variant">Up to 3 active jobs</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-hf-on-surface-variant">Embeddable application widget</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-hf-on-surface-variant">Basic candidate pipeline</span>
</li>
</ul>
</div>
{/*Growth (Highlighted)*/}
<div className="bg-surface rounded-[1rem] p-8 border-2 border-primary shadow-xl flex flex-col relative transform md:-translate-y-4 hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary font-label-sm px-4 py-1.5 rounded-[9999px] uppercase tracking-widest shadow-md border border-white/20 flex items-center gap-1.5 whitespace-nowrap z-10">
<span className="material-symbols-outlined text-[14px] fill-1">star</span>Most Popular
                </div>
<h3 className="font-headline-md text-on-surface mb-2 opacity-0 hf-animate-fade-in-up">
                  Growth
                </h3>
<p className="font-body-sm text-on-surface-variant mb-6 h-10">
                  For growing companies actively scaling their team.
                </p>
<div className="mb-8">
<span className="font-headline-xl text-hf-on-surface">$149</span>
<span className="font-body-sm text-hf-on-surface-variant">/mo</span>
</div>
<button className="w-full py-3 px-4 bg-primary hover:bg-primary-fixed-variant text-on-primary font-label-md rounded-[0.5rem] mb-8 transition-colors shadow-md hover:-translate-y-[2px] hover:shadow-lg hover:shadow-hf-primary//30 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  Start Free Trial
                </button>
<ul className="flex flex-col gap-4 flex-grow">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-hf-on-surface">Unlimited active jobs</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-on-surface font-semibold">AI-assisted evaluation</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-hf-on-surface">Custom interview workflows</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-hf-on-surface">Team collaboration tools</span>
</li>
</ul>
</div>
{/*Enterprise*/}
<div className="bg-surface rounded-[1rem] p-8 border border-outline-variant shadow-sm flex flex-col hover:scale-[1.01] hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
<h3 className="font-headline-md text-on-surface mb-2 opacity-0 hf-animate-fade-in-up">
                  Enterprise
                </h3>
<p className="font-body-sm text-on-surface-variant mb-6 h-10">
                  Custom workflows and advanced security for large orgs.
                </p>
<div className="mb-8">
<span className="font-headline-xl text-hf-on-surface">Custom</span>
</div>
<button className="w-full py-3 px-4 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md rounded-[0.5rem] mb-8 transition-colors border border-outline-variant hover:-translate-y-[2px] hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  Contact Sales
                </button>
<ul className="flex flex-col gap-4 flex-grow">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-hf-on-surface-variant">Everything in Growth</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-hf-on-surface-variant">SSO &amp; Advanced Security</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-hf-on-surface-variant">Custom Integrations API</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check</span>
<span className="font-body-sm text-hf-on-surface-variant">Dedicated Success Manager</span>
</li>
</ul>
</div>
</div>
</div>
</section>
  );
}
