import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import StylerApp  from "@/components/StylerApp";
import { Footer } from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollToSection } from "@/hooks/useScrollToSection";

// Lazy loading for better performance
const LazyFeatures = React.lazy(() => 
  import("@/components/Features").then(module => ({ default: module.Features }))
);
const LazyHowItWorks = React.lazy(() => 
  import("@/components/HowItWorks").then(module => ({ default: module.HowItWorks }))
);
const LazyStylerApp = React.lazy(() => import("@/components/StylerApp"));

const Index = () => {
  // SEO and accessibility
  useDocumentTitle("Drip - Style Your Components with Ease");
  useScrollToSection(); // Handle smooth scrolling to sections

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50
                   focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      
      <Header />
      
      <main id="main-content" className="pt-16" role="main">
        {/* Hero section - always visible */}
        <Hero />
        
        {/* Lazy loaded sections with loading fallbacks */}
        <React.Suspense 
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="loading-spinner w-8 h-8 border-2 border-primary/20 
                            border-t-primary rounded-full" 
                   aria-label="Loading content..." />
            </div>
          }
        >
          <section 
            id="features" 
            aria-labelledby="features-heading"
            className="scroll-mt-20" // Account for fixed header
          >
            <LazyFeatures />
          </section>
          
          <section 
            id="how-it-works" 
            aria-labelledby="how-it-works-heading"
            className="scroll-mt-20"
          >
            <LazyHowItWorks />
          </section>
          
          <section 
            id="app" 
            aria-labelledby="app-heading"
            className="scroll-mt-20"
          >
            <LazyStylerApp />
          </section>
        </React.Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;