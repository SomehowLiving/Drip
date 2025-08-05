
// ==========================================
// Enhanced HowItWorks Component  
// ==========================================

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Code2, Palette, Download, Play } from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    number: "01",
    icon: Code2,
    title: "Paste Your Code",
    description: "Simply paste your React component or choose from our examples. We support JSX, TSX, and even plain HTML.",
    preview: (
      <div className="bg-secondary/50 rounded-lg p-3 font-mono text-sm border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span className="text-xs text-muted-foreground ml-2">component.jsx</span>
        </div>
        <div className="text-xs">
          <span className="text-blue-600">const</span> <span className="text-purple-600">Button</span> = () {" => {"}
          <br />
          <span className="ml-2">return</span> <span className="text-green-600">&lt;button&gt;</span>Click<span className="text-green-600">&lt;/button&gt;</span>;
          <br />
          {"}"};
        </div>
      </div>
    ),
    tips: ["Supports React components", "Works with TypeScript", "Handles props automatically"]
  },
  {
    number: "02", 
    icon: Palette,
    title: "Choose Your Style",
    description: "Pick from beautiful presets or customize colors to match your brand. See live previews instantly as you design.",
    preview: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-medium shadow-sm">Clean</div>
          <div className="h-8 bg-purple-100 border border-purple-300 rounded-lg flex items-center justify-center text-purple-700 text-xs font-medium">Soft</div>
          <div className="h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs font-medium">Dark</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-full"></div>
          <div className="flex-1 h-2 bg-secondary rounded-full">
            <div className="w-3/4 h-full bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    ),
    tips: ["50+ design presets", "Custom color palettes", "Brand matching tools"]
  },
  {
    number: "03",
    icon: Download,
    title: "Copy & Deploy",
    description: "Get your production-ready styled component code instantly. Copy to clipboard, download as file, or integrate directly.",
    preview: (
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-success/10 rounded-lg border border-success/20">
          <Badge variant="secondary" className="text-xs text-success bg-success/20">✓ Styled & Ready</Badge>
          <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">Copy</Button>
        </div>
        <div className="h-3 bg-secondary/50 rounded"></div>
        <div className="h-3 bg-secondary/50 rounded w-4/5"></div>
        <div className="h-3 bg-secondary/50 rounded w-3/5"></div>
      </div>
    ),
    tips: ["Production-ready code", "One-click copying", "Export multiple formats"]
  }
];

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  

  return (
    <section 
      ref={ref}
      className="py-16 sm:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your components into beautiful UIs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Enhanced Connection Line */}
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 z-0">
                  <div className="h-full bg-gradient-to-r from-primary via-primary/50 to-transparent relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent w-1/3 animate-pulse" />
                  </div>
                </div>
              )}
              
              <Card 
                className={`relative z-10 p-6 sm:p-8 hover-lift cursor-pointer transition-all duration-300 ${
                  activeStep === index ? 'ring-2 ring-primary/50 shadow-xl' : ''
                } ${isIntersecting ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'forwards'
                }}
                onClick={() => setActiveStep(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveStep(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={activeStep === index}
              >
                {/* Enhanced Step Number */}
                <div className="text-center space-y-6">
                  <div className="relative mx-auto w-16 h-16">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-glow opacity-20 animate-pulse"></div>
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Enhanced Icon */}
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Enhanced Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Enhanced Preview */}
                  <div className="p-4 bg-gradient-to-br from-secondary/30 to-accent/5 rounded-lg border border-border/30">
                    {step.preview}
                  </div>

                  {/* Tips Section */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-primary">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {step.tips.map((tip, tipIndex) => (
                        <span key={tipIndex} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {tip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Interactive Demo CTA */}
        <div className="text-center mt-12 sm:mt-16 space-y-4">
          <p className="text-muted-foreground">
            See it in action with our interactive demo
          </p>
          <Button 
            className="btn-hero group"
            onClick={() => document.getElementById('app')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Try Live Demo
          </Button>
        </div>
      </div>
    </section>
  );
};