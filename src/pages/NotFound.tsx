
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Enhanced error logging
  useEffect(() => {
    // Log error with more context
    console.error("404 Error Details:", {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });

    // Optional: Send to analytics service
    // analytics.track('404_error', { path: location.pathname });
  }, [location]);

  // Auto-redirect countdown (optional)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // SEO and accessibility
  useEffect(() => {
    document.title = "404 - Page Not Found | React Component Styler";
    
    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "404 Error Page",
      "description": "The requested page could not be found.",
      "url": window.location.href,
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Suggest similar routes based on current path
  const getSuggestedRoutes = (pathname: string) => {
    const suggestions = [];
    
    if (pathname.includes('feature')) {
      suggestions.push({ label: 'Features', path: '/#features' });
    }
    if (pathname.includes('how') || pathname.includes('work')) {
      suggestions.push({ label: 'How It Works', path: '/#how-it-works' });
    }
    if (pathname.includes('app') || pathname.includes('tool')) {
      suggestions.push({ label: 'Styler App', path: '/#app' });
    }
    if (pathname.includes('contact') || pathname.includes('support')) {
      suggestions.push({ label: 'Contact Us', path: '/contact' });
    }
    
    return suggestions.length > 0 ? suggestions : [
      { label: 'Home', path: '/' },
      { label: 'Features', path: '/#features' },
      { label: 'How It Works', path: '/#how-it-works' },
    ];
  };

  const suggestedRoutes = getSuggestedRoutes(location.pathname);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br 
                    from-background via-secondary/20 to-accent/10 p-4">
      <Card className="max-w-2xl w-full p-8 sm:p-12 text-center space-y-8 
                       shadow-xl border-border/50 bg-card/80 backdrop-blur-sm">
        {/* Error illustration */}
        <div className="relative">
          <div className="text-8xl sm:text-9xl font-bold text-primary/20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <HelpCircle className="w-16 h-16 sm:w-20 sm:h-20 text-primary/60" />
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Oops! Page Not Found
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          
          {/* Show the attempted path */}
          <div className="bg-secondary/50 rounded-lg p-3 text-sm text-muted-foreground 
                          border border-border/30 font-mono break-all">
            Attempted URL: <span className="text-foreground">{location.pathname}</span>
          </div>
        </div>

        {/* Suggested routes */}
        {suggestedRoutes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Maybe you were looking for:
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedRoutes.map((route) => (
                <Button
                  key={route.path}
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(route.path)}
                  className="text-sm hover:bg-primary hover:text-primary-foreground"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {route.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Button>
          
          <Button
            onClick={handleGoBack}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Auto-redirect notice */}
        <div className="text-sm text-muted-foreground border-t border-border/30 pt-6">
          <p>
            Automatically redirecting to homepage in{' '}
            <span className="font-mono font-semibold text-primary">
              {countdown}
            </span>{' '}
            seconds
          </p>
          <button
            onClick={() => setCountdown(0)}
            className="text-primary hover:text-primary-dark underline mt-2"
          >
            Redirect now
          </button>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;