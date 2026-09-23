export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant mt-hf-stack-lg">
<div className="max-w-container-max mx-auto px-margin-desktop py-16">
<div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-12">
<div className="flex flex-col gap-hf-stack-sm">
<span className="font-label-md text-label-md text-on-surface mb-2">Product</span><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Features</a><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">How It Works</a><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Pricing</a>
</div>
<div className="flex flex-col gap-hf-stack-sm">
<span className="font-label-md text-label-md text-on-surface mb-2">Resources</span><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Documentation</a><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Help Center</a><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Blog</a><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a>
</div>
<div className="flex flex-col gap-hf-stack-sm">
<span className="font-label-md text-label-md text-on-surface mb-2">Company</span><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">About</a><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Careers</a><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a>
</div>
<div className="flex flex-col gap-hf-stack-sm">
<span className="font-label-md text-label-md text-on-surface mb-2">Legal</span><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a><a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
</div>
</div>
<div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-hf-stack-md">
<div className="flex items-center gap-2">
<div className="w-6 h-6 bg-primary rounded-[0.25rem] flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-[14px]">flowsheet</span>
</div>
<span className="font-headline-md text-[18px] text-hf-on-surface">Hireflow AI</span>
</div>
<p className="text-body-sm text-hf-on-tertiary-fixed-variant">
            © 2026 Hireflow AI. All rights reserved.
          </p>
</div>
</div>
</footer>
  );
}
