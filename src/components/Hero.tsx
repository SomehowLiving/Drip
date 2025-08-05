import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Sparkles, Zap, Play, Pause } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import heroImage from "@/assets/hero-illustration.jpg";

const DEMO_COMPONENT = `const Button = ({ children }) => {
  return <button>{children}</button>;
};`;

const STYLED_VARIANTS = [
  {
    name: "Clean",
    code: `const Button = ({ children }) => {
  return (
    <button className="px-6 py-3 bg-blue-500 text-white 
      rounded-lg font-medium hover:bg-blue-600 
      transition-colors shadow-sm">
      {children}
    </button>
  );
};`,
    preview: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm",
    description: "Modern and minimal design"
  },
  {
    name: "Soft", 
    code: `const Button = ({ children }) => {
  return (
    <button className="px-6 py-3 bg-purple-100 text-purple-700
      rounded-xl font-medium hover:bg-purple-200
      transition-all shadow-lg">
      {children}
    </button>
  );
};`,
    preview: "bg-purple-100 hover:bg-purple-200 text-purple-700 shadow-lg",
    description: "Gentle and approachable style"
  },
  {
    name: "Dark",
    code: `const Button = ({ children }) => {
  return (
    <button className="px-6 py-3 bg-gray-900 text-white
      rounded-lg font-semibold hover:bg-gray-800
      transition-all border border-gray-700">
      {children}
    </button>
  );
};`,
    preview: "bg-gray-900 hover:bg-gray-800 text-white border border-gray-700",
    description: "Bold and professional look"
  }
];

export const Hero = () => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  // Auto-cycle through variants
  const [currentTime, setCurrentTime] = useState(0);
  
  const handleVariantChange = useCallback((index: number) => {
    setSelectedVariant(index);
    setIsAutoPlay(false); // Stop auto-play when user interacts
  }, []);

  const scrollToApp = useCallback(() => {
    const appSection = document.getElementById('app');
    if (appSection) {
      appSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Auto-play functionality
  useMemo(() => {
    if (!isAutoPlay || !isIntersecting) return;
    
    const interval = setInterval(() => {
      setSelectedVariant(prev => (prev + 1) % STYLED_VARIANTS.length);
      setCurrentTime(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, isIntersecting]);

  const currentVariant = STYLED_VARIANTS[selectedVariant];

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
      
      {/* Optimized background image with better loading */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="" // Decorative image
          className="w-full h-full object-cover object-center"
          loading="eager" // Hero image should load immediately
          decoding="async"
        />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Enhanced Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm animate-scale-in hover:bg-primary/15 transition-colors">
              <Sparkles className="w-4 h-4 animate-bounce-gentle" />
              Transform Components Instantly
            </div>
            
            <h1 
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
            >
              Turn <span className="text-gradient bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent">Boring Components</span>
              <br />
              Into <span className="text-gradient bg-gradient-to-r from-accent to-primary-500 bg-clip-text text-transparent">Beautiful UIs</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From basic React code to stunning interfaces in seconds. 
              <span className="hidden sm:inline">No CSS expertise required, just paste and transform.</span>
            </p>
          </div>

          {/* Enhanced Demo Section */}
          <div className="max-w-6xl mx-auto animate-slide-up">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-center">
              {/* Before Card */}
              <Card className="p-4 sm:p-6 space-y-4 hover-lift">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium">
                    <Code className="w-5 h-5" />
                    Before
                  </div>
                  <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">
                    Needs styling
                  </span>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm text-left overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">
                    <code>{DEMO_COMPONENT}</code>
                  </pre>
                </div>
                
                <div className="p-4 border-2 border-dashed border-border rounded-lg bg-card/50">
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded border border-border hover:bg-muted transition-colors">
                    Unstyled Button
                  </button>
                </div>
              </Card>

              {/* Enhanced Arrow */}
              <div className="hidden lg:flex flex-col items-center gap-2">
                <ArrowRight className="w-8 h-8 text-primary animate-pulse" />
                <div className="text-xs text-muted-foreground font-medium">
                  AI Styling
                </div>
              </div>

              {/* After Card */}
              <Card className="p-4 sm:p-6 space-y-4 hover-lift">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Sparkles className="w-5 h-5" />
                    After
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                      Styled
                    </span>
                    <button
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      className="p-1 hover:bg-secondary rounded"
                      aria-label={isAutoPlay ? "Pause auto-play" : "Start auto-play"}
                    >
                      {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                
                {/* Enhanced Style Selector */}
                <div className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    {STYLED_VARIANTS.map((variant, index) => (
                      <button
                        key={variant.name}
                        onClick={() => handleVariantChange(index)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                          selectedVariant === index
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-secondary text-secondary-foreground hover:bg-muted'
                        }`}
                        aria-pressed={selectedVariant === index}
                        title={variant.description}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {currentVariant.description}
                  </p>
                </div>

                {/* Enhanced Preview */}
                <div className="p-4 bg-gradient-to-br from-card to-secondary/30 rounded-lg border border-border/50">
                  <button 
                    className={`px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${currentVariant.preview}`}
                    aria-label={`Preview of ${currentVariant.name} style`}
                  >
                    Beautiful Button
                  </button>
                </div>
              </Card>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="btn-hero text-lg px-8 py-4 group"
                onClick={scrollToApp}
              >
                Start Styling Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  // Copy demo code to clipboard
                  navigator.clipboard.writeText(currentVariant.code);
                }}
              >
                <Code className="w-4 h-4 mr-2" />
                Copy Demo Code
              </Button>
            </div>
            
            {/* Enhanced Features List */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Zap className="w-4 h-4 text-accent" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Code className="w-4 h-4 text-accent" />
                <span>No registration</span>
              </div>
              <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Instant preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
