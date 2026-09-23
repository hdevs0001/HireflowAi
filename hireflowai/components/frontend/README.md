# Hireflow AI Frontend Landing Page

This folder contains the landing page split from the supplied HTML into reusable React/Next.js components.

## Components

- `FrontendLandingPage.tsx` — page composition + intersection-observer animation
- `Navbar.tsx`
- `HeroSection.tsx`
- `ProblemSection.tsx`
- `HowItWorksSection.tsx`
- `WidgetSection.tsx`
- `AiEvaluationSection.tsx`
- `PipelineDashboardSection.tsx`
- `PricingSection.tsx`
- `FinalCtaSection.tsx`
- `Footer.tsx`
- `frontend.css` — landing-page-only Tailwind theme tokens, font imports, animation, and scoped baseline rules
- `index.ts` — barrel exports

## Usage

Import `frontend.css` once from your App Router root layout, then render `FrontendLandingPage` from the page where the landing page belongs.

```tsx
import "@/components/frontend/frontend.css";
import { FrontendLandingPage } from "@/components/frontend";

export default function Page() {
  return <FrontendLandingPage />;
}
```

The landing-page design tokens intentionally use the `hf-*` namespace (`bg-hf-*`, `text-hf-*`, `font-hf-*`, etc.) so the components do not rely on the variables in the existing global.css.
