export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-hf-surface//90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
<div className="h-20 w-full px-margin-desktop max-w-container-max mx-auto flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-primary rounded-[0.5rem] flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-[20px]">flowsheet</span>
</div>
<span className="font-headline-md text-headline-md tracking-tight text-hf-on-surface">Hireflow AI</span>
</div>
<nav className="hidden lg:flex items-center gap-hf-stack-lg" data-active-classes="text-primary font-bold">
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] inline-block" data-path="product" href="#">Product</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] inline-block" data-path="how-it-works" href="#">How It Works</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] inline-block" data-path="features" href="#">Features</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] inline-block" data-path="pricing" href="#">Pricing</a>
<div className="relative group">
<button className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-primary hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] inline-flex">
              Resources
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
</button>
<div className="absolute left-0 top-full pt-4 hidden group-hover:block">
<div className="bg-surface shadow-lg rounded-[0.75rem] border border-outline-variant p-2 w-48">
<a className="block px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-[0.5rem]" data-path="documentation" href="#">Documentation</a><a className="block px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-[0.5rem]" data-path="help-center" href="#">Help Center</a><a className="block px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-[0.5rem]" data-path="blog" href="#">Blog</a><a className="block px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-[0.5rem]" data-path="contact" href="#">Contact</a>
</div>
</div>
</div>
</nav>
<div className="flex items-center gap-hf-stack-md">
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary px-4 hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] inline-block" data-path="login" href="#">Log in</a><button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-[0.5rem] hover:bg-hf-primary//90 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-hf-primary//30 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-md">
            Get Started Free
          </button>
</div>
</div>
</header>
  );
}
