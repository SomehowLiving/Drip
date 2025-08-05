// ==========================================
// Enhanced Header Component
// ==========================================

import { Button } from "@/components/ui/button";
import { Code, Github, Menu, X, ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const NAVIGATION_ITEMS = [
  { label: "Features", href: "#features", description: "See what makes us special" },
  { label: "How it Works", href: "#how-it-works", description: "Learn the simple process" },
  { label: "Live Demo", href: "#app", description: "Try it yourself" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('header')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Handle navigation clicks
  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled 
      ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm' 
      : 'bg-background/80 backdrop-blur-sm border-b border-border/30'
    }
    ${scrollDirection === 'down' && isScrolled ? '-translate-y-full' : 'translate-y-0'}
  `;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <div className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Code className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent opacity-0 hover:opacity-20 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                ComponentStyler
              </span>
              <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">
                AI-Powered Styling
              </span>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="group relative px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-secondary/50"
                title={item.description}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </nav>

          {/* Enhanced Actions */}
          <div className="flex items-center gap-3">
            {/* GitHub Link */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex group hover:bg-secondary"
              onClick={() => window.open('https://github.com/your-repo', '_blank')}
            >
              <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
            </Button>
            
            {/* CTA Button */}
            <Button 
              className="btn-hero text-sm px-4 py-2 shadow-lg hover:shadow-xl transition-all"
              onClick={() => handleNavClick('#app')}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Try Free
            </Button>

            {/* Enhanced Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden relative p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <Menu 
                  className={`absolute inset-0 w-5 h-5 transition-all duration-200 ${
                    mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`} 
                />
                <X 
                  className={`absolute inset-0 w-5 h-5 transition-all duration-200 ${
                    mobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`} 
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="py-4 border-t border-border/50 bg-card/50 backdrop-blur-sm rounded-b-lg mt-2">
            <nav className="flex flex-col gap-2">
              {NAVIGATION_ITEMS.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="group flex items-center justify-between px-4 py-3 text-left hover:bg-secondary/50 transition-all duration-200 rounded-lg mx-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
              
              {/* Mobile GitHub Link */}
              <div className="mx-2 mt-2 pt-2 border-t border-border/30">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start group"
                  onClick={() => window.open('https://github.com/your-repo', '_blank')}
                >
                  <Github className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
