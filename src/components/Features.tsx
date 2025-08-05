import { Card } from "@/components/ui/card";
import { Code, Palette, Zap, Copy, Smartphone, RefreshCw, Shield, Rocket, ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Transform components in seconds with AI-powered styling. No more hours spent tweaking CSS.",
    stats: "< 3s",
    color: "text-yellow-500"
  },
  {
    icon: Palette,
    title: "Beautiful Presets",
    description: "Curated design systems inspired by top brands. From minimal to bold, find your perfect style.",
    stats: "50+ styles",
    color: "text-purple-500"
  },
  {
    icon: Code,
    title: "Logic Preserved",
    description: "Your component functionality stays 100% intact. We only enhance the visual layer.",
    stats: "Zero bugs",
    color: "text-blue-500"
  },
  {
    icon: Copy,
    title: "Production Ready",
    description: "Clean, optimized code that passes linting and follows best practices out of the box.",
    stats: "Copy & paste",
    color: "text-green-500"
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Every style includes responsive breakpoints. Perfect on mobile, tablet, and desktop.",
    stats: "All devices",
    color: "text-pink-500"
  },
  {
    icon: RefreshCw,
    title: "Live Preview",
    description: "See changes instantly as you customize. Real-time feedback for perfect results.",
    stats: "0ms delay",
    color: "text-orange-500"
  },
  {
    icon: Shield,
    title: "Type Safe",
    description: "Full TypeScript support with proper prop types and intellisense integration.",
    stats: "100% typed",
    color: "text-indigo-500"
  },
  {
    icon: Rocket,
    title: "Framework Agnostic", 
    description: "Works with React, Next.js, Gatsby, and any modern React framework or library.",
    stats: "Universal",
    color: "text-cyan-500"
  }
];

export const Features = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className="py-16 sm:py-24 bg-gradient-to-b from-background via-secondary/10 to-background"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 id="features-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Why Choose <span className="text-gradient">Component Styler</span>?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Built for developers who want beautiful UIs without the CSS complexity
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {FEATURES.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={`card-feature group relative overflow-hidden ${
                isIntersecting ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-3xl" />
              
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                    {feature.stats}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to transform your components?
          </p>
          <Button 
            className="btn-hero"
            onClick={() => document.getElementById('app')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Try It Free Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
