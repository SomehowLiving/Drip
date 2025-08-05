import { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, RefreshCw, Code, Palette, Eye, Sparkles, Play, Wand2, CheckCircle, AlertCircle } from "lucide-react";
import React from "react";

// Dynamic Component Renderer for Live Preview
const DynamicPreview = ({ transformedCode, presetId }) => {
  const [PreviewComponent, setPreviewComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!transformedCode) {
      setPreviewComponent(null);
      return;
    }

    try {
      // Extract the component function from the code
      const componentMatch = transformedCode.match(/const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{([\s\S]*?)};?$/);
      if (!componentMatch) {
        setError("Could not parse component structure");
        return;
      }

      const [, componentName, componentBody] = componentMatch;
      
      // Extract the return statement JSX
      const returnMatch = componentBody.match(/return\s*\(\s*([\s\S]*?)\s*\);?\s*$/);
      if (!returnMatch) {
        setError("Could not find return statement");
        return;
      }

      let jsxContent = returnMatch[1].trim();
      
      // Create a functional component that can be rendered
      const createPreviewComponent = () => {
        // Handle props in the JSX (replace with sample data)
        jsxContent = jsxContent
          .replace(/\{children\}/g, '"Click me"')
          .replace(/\{title\}/g, '"Sample Title"')
          .replace(/\{content\}/g, '"This is sample content for the preview."')
          .replace(/\{[^}]+\}/g, (match) => {
            // Replace other props with appropriate defaults
            if (match.includes('onClick')) return '() => {}';
            return '"Sample"';
          });

        // Convert JSX string to actual JSX
        try {
          // This is a simplified approach - in production, you'd want a proper JSX parser
          const componentCode = `
            const PreviewComp = () => {
              return (
                <div className="preview-container">
                  ${jsxContent}
                </div>
              );
            };
            return PreviewComp;
          `;
          
          const ComponentFunction = new Function('React', componentCode);
          return ComponentFunction({ createElement: React.createElement });
        } catch (err) {
          console.error('Error creating preview component:', err);
          return null;
        }
      };

      const component = createPreviewComponent();
      setPreviewComponent(() => component);
      setError(null);
    } catch (err) {
      console.error('Preview error:', err);
      setError(err.message);
    }
  }, [transformedCode]);

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          <span>Preview Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!PreviewComponent) {
    return (
      <div className="p-4 bg-muted/50 rounded-lg border border-border/30 flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Generating preview...</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground mb-2">Live Component Preview:</div>
      <div className="p-6 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center min-h-[120px]">
        <div className="preview-wrapper">
          <PreviewComponent />
        </div>
      </div>
    </div>
  );
};

// Fallback Static Preview (improved)
const StaticPreview = ({ code, presetId }) => {
  const presetStyles = {
    clean: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm rounded-lg",
    soft: "bg-purple-100 hover:bg-purple-200 text-purple-700 shadow-lg border border-purple-200 rounded-xl",
    dark: "bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 rounded-lg",
    gradient: "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg rounded-lg",
    glass: "bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 shadow-xl rounded-lg",
    neon: "bg-black border border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/20 rounded-lg"
  };

  const getComponentType = () => {
    if (code.includes('<button')) return 'button';
    if (code.includes('type="email"') || code.includes('type="password"')) return 'form';
    if (code.includes('<h3') || code.includes('<h2') || code.includes('<h1')) return 'card';
    if (code.includes('Home') && code.includes('About')) return 'nav';
    return 'generic';
  };

  const componentType = getComponentType();
  const baseStyle = presetStyles[presetId] || presetStyles.clean;

  const renderPreview = () => {
    switch (componentType) {
      case 'button':
        return (
          <button className={`px-6 py-3 font-medium transition-colors ${baseStyle}`}>
            Click me
          </button>
        );
      
      case 'form':
        return (
          <div className="space-y-4 p-6 max-w-md">
            <input 
              className={`w-full px-4 py-2 ${baseStyle.replace('hover:bg-', 'focus:bg-')} placeholder-opacity-70`}
              type="email" 
              placeholder="Email" 
              readOnly 
            />
            <input 
              className={`w-full px-4 py-2 ${baseStyle.replace('hover:bg-', 'focus:bg-')} placeholder-opacity-70`}
              type="password" 
              placeholder="Password" 
              readOnly 
            />
            <button className={`px-6 py-3 font-medium transition-colors ${baseStyle}`}>
              Login
            </button>
          </div>
        );
      
      case 'card':
        return (
          <div className={`p-6 max-w-sm ${baseStyle}`}>
            <h3 className="text-xl font-semibold mb-2">Sample Title</h3>
            <p className="opacity-80">This is sample content for the card component.</p>
          </div>
        );
      
      case 'nav':
        return (
          <nav className={`p-4 ${baseStyle}`}>
            <div className="flex items-center space-x-6">
              <span className="font-semibold">Logo</span>
              <span className="hover:opacity-80">Home</span>
              <span className="hover:opacity-80">About</span>
              <span className="hover:opacity-80">Contact</span>
            </div>
          </nav>
        );
      
      default:
        return (
          <div className={`p-4 ${baseStyle}`}>
            <span>Preview Component</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground mb-2">Component Preview:</div>
      <div className="p-6 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center min-h-[120px]">
        {renderPreview()}
      </div>
    </div>
  );
};

const EXAMPLE_COMPONENTS = [
  {
    name: "Simple Button",
    description: "Basic button component",
    code: `const Button = ({ children }) => {
  return <button>{children}</button>;
};`,
    complexity: "Simple"
  },
  {
    name: "Login Form",
    description: "Email and password form",
    code: `const LoginForm = () => {
  return (
    <div>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </div>
  );
};`,
    complexity: "Medium"
  },
  {
    name: "Card Component",
    description: "Content card with title",
    code: `const Card = ({ title, content }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};`,
    complexity: "Simple"
  },
  {
    name: "Navigation Bar",
    description: "Header navigation component",
    code: `const NavBar = () => {
  return (
    <div>
      <div>Logo</div>
      <div>
        <span>Home</span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </div>
  );
};`,
    complexity: "Medium"
  }
];

const STYLE_PRESETS = [
  {
    id: "clean",
    name: "Clean",
    description: "Google-inspired minimalism",
    preview: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm",
    color: "blue",
    popular: true,
    tags: ["minimal", "google", "corporate"]
  },
  {
    id: "soft",
    name: "Soft",
    description: "Gentle curves and pastel colors",
    preview: "bg-purple-100 hover:bg-purple-200 text-purple-700 shadow-lg border border-purple-200",
    color: "purple",
    tags: ["friendly", "approachable", "rounded"]
  },
  {
    id: "dark",
    name: "Dark",
    description: "Modern dark theme",
    preview: "bg-gray-900 hover:bg-gray-800 text-white border border-gray-700",
    color: "gray",
    tags: ["modern", "sleek", "professional"]
  },
  {
    id: "gradient",
    name: "Gradient",
    description: "Vibrant gradient styles",
    preview: "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg",
    color: "gradient",
    tags: ["vibrant", "modern", "eye-catching"]
  },
  {
    id: "glass",
    name: "Glass",
    description: "Glassmorphism effect",
    preview: "bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 shadow-xl",
    color: "glass",
    tags: ["trendy", "translucent", "modern"]
  },
  {
    id: "neon",
    name: "Neon",
    description: "Cyberpunk-inspired glow",
    preview: "bg-black border border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/20",
    color: "cyan",
    tags: ["cyberpunk", "futuristic", "glow"]
  }
];

const TRANSFORMATION_RULES = {
  clean: {
    button: 'className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"',
    input: 'className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"',
    div: 'className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"',
    h1: 'className="text-3xl font-bold text-gray-900 mb-4"',
    h2: 'className="text-2xl font-bold text-gray-900 mb-3"',
    h3: 'className="text-xl font-semibold text-gray-900 mb-2"',
    p: 'className="text-gray-600 leading-relaxed"',
    span: 'className="text-gray-600 hover:text-blue-600 font-medium transition-colors"',
    nav: 'className="bg-white shadow-sm border-b border-gray-200"'
  },
  soft: {
    button: 'className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-all shadow-lg border border-purple-200"',
    input: 'className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50/50"',
    div: 'className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100"',
    h1: 'className="text-3xl font-bold text-purple-900 mb-4"',
    h2: 'className="text-2xl font-bold text-purple-900 mb-3"',
    h3: 'className="text-xl font-semibold text-purple-900 mb-3"',
    p: 'className="text-purple-700 leading-relaxed"',
    span: 'className="text-purple-600 hover:text-purple-800 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-100"',
    nav: 'className="bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg border-b border-purple-200"'
  },
  dark: {
    button: 'className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all border border-gray-700 shadow-lg hover:shadow-xl"',
    input: 'className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400"',
    div: 'className="p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-700 text-white"',
    h1: 'className="text-3xl font-bold text-white mb-4"',
    h2: 'className="text-2xl font-bold text-white mb-3"',
    h3: 'className="text-xl font-semibold text-white mb-2"',
    p: 'className="text-gray-300 leading-relaxed"',
    span: 'className="text-gray-300 hover:text-white font-medium transition-colors"',
    nav: 'className="bg-gray-900 shadow-xl border-b border-gray-700"'
  },
  gradient: {
    button: 'className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"',
    input: 'className="w-full px-4 py-2 border-2 border-transparent bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg focus:outline-none focus:border-gradient-to-r focus:from-orange-400 focus:to-pink-500"',
    div: 'className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl transition-all"',
    h1: 'className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4"',
    h2: 'className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-3"',
    h3: 'className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2"',
    p: 'className="text-gray-700 leading-relaxed"',
    span: 'className="text-orange-600 hover:text-pink-600 font-medium transition-colors"',
    nav: 'className="bg-gradient-to-r from-orange-50 to-pink-50 shadow-lg border-b border-orange-200"'
  },
  glass: {
    button: 'className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 rounded-lg font-medium hover:bg-white/30 transition-all shadow-lg"',
    input: 'className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:outline-none focus:bg-white/30 text-gray-800 placeholder-gray-600"',
    div: 'className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 hover:bg-white/20 transition-all"',
    h1: 'className="text-3xl font-bold text-gray-800 mb-4"',
    h2: 'className="text-2xl font-bold text-gray-800 mb-3"',
    h3: 'className="text-xl font-semibold text-gray-800 mb-2"',
    p: 'className="text-gray-700 leading-relaxed"',
    span: 'className="text-gray-700 hover:text-gray-900 font-medium transition-colors"',
    nav: 'className="bg-white/10 backdrop-blur-md shadow-xl border-b border-white/20"'
  },
  neon: {
    button: 'className="px-6 py-3 bg-black border border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"',
    input: 'className="w-full px-4 py-2 bg-black border border-cyan-400 rounded-lg focus:outline-none focus:shadow-lg focus:shadow-cyan-400/20 text-cyan-400 placeholder-cyan-600"',
    div: 'className="p-6 bg-black rounded-xl shadow-xl border border-cyan-400 shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all"',
    h1: 'className="text-3xl font-bold text-cyan-400 mb-4"',
    h2: 'className="text-2xl font-bold text-cyan-400 mb-3"',
    h3: 'className="text-xl font-semibold text-cyan-400 mb-2"',
    p: 'className="text-cyan-300 leading-relaxed"',
    span: 'className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:shadow-lg hover:shadow-cyan-400/20"',
    nav: 'className="bg-black shadow-xl border-b border-cyan-400 shadow-cyan-400/10"'
  }
};

export default function StylerApp() {
  const [inputCode, setInputCode] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('clean');
  const [transformedCode, setTransformedCode] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationStep, setTransformationStep] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Enhanced transformation function
  const transformCode = useCallback((code, presetId) => {
    const rules = TRANSFORMATION_RULES[presetId];
    if (!rules) return code;

    let transformed = code;
    
    // Transform each HTML element type with better regex patterns
    Object.entries(rules).forEach(([tag, className]) => {
      // Handle self-closing tags
      const selfClosingRegex = new RegExp(`<${tag}([^>]*?)\\s*/>`, 'g');
      // Handle opening tags
      const openingTagRegex = new RegExp(`<${tag}([^>]*?)>`, 'g');
      
      transformed = transformed.replace(selfClosingRegex, (match, attrs) => {
        if (attrs.includes('className=')) {
          return match; // Don't modify if className already exists
        }
        return `<${tag}${attrs} ${className} />`;
      });
      
      transformed = transformed.replace(openingTagRegex, (match, attrs) => {
        if (attrs.includes('className=')) {
          return match;
        }
        return `<${tag}${attrs} ${className}>`;
      });
    });

    return transformed;
  }, []);

  // Auto-transform with improved debouncing
  useEffect(() => {
    if (!inputCode.trim() || isTransforming) return;
    
    const timer = setTimeout(() => {
      handleTransform();
    }, 1500); // Increased debounce time

    return () => clearTimeout(timer);
  }, [inputCode, selectedPreset]);

  const handleExampleSelect = useCallback((example) => {
    setInputCode(example.code);
    setShowPreview(false);
    setTransformedCode('');
  }, []);

  const handleTransform = useCallback(async () => {
    if (!inputCode.trim()) return;

    setIsTransforming(true);
    setTransformationStep('Analyzing component structure...');
    
    await new Promise(resolve => setTimeout(resolve, 400));
    setTransformationStep('Applying styling rules...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setTransformationStep('Optimizing for accessibility...');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setTransformationStep('Finalizing component...');
    
    const styled = transformCode(inputCode, selectedPreset);
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    setTransformedCode(styled);
    setIsTransforming(false);
    setTransformationStep('');
    setShowPreview(true);
  }, [inputCode, selectedPreset, transformCode]);

  const handleCopyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(transformedCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [transformedCode]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([transformedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'styled-component.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [transformedCode]);

  const selectedPresetData = STYLE_PRESETS.find(p => p.id === selectedPreset);

  return (
    <section id="app" className="py-20 bg-gradient-to-b from-secondary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
            <Sparkles className="w-4 h-4" />
            AI-Powered Component Styling
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Transform Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Components</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Paste your React component and watch it become beautiful in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <Card className="p-6 space-y-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Your Component</h3>
              </div>
              <Badge variant="secondary" className="text-xs">
                Step 1
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Try an example:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EXAMPLE_COMPONENTS.map((example) => (
                    <Button
                      key={example.name}
                      variant="outline"
                      size="sm"
                      onClick={() => handleExampleSelect(example)}
                      className="text-xs h-auto p-2 flex flex-col items-start hover:bg-primary/5"
                      title={example.description}
                    >
                      <span className="font-medium">{example.name}</span>
                      <span className="text-muted-foreground text-xs">{example.complexity}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Or paste your own:
                </label>
                <Textarea
                  placeholder="const MyComponent = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <button>Click me</button>
    </div>
  );
};"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-[300px] font-mono text-sm resize-none"
                />
              </div>
            </div>
          </Card>

          {/* Style Selection */}
          <Card className="p-6 space-y-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Choose Style</h3>
              </div>
              <Badge variant="secondary" className="text-xs">
                Step 2
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {STYLE_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                    selectedPreset === preset.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {preset.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs">
                      Popular
                    </Badge>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{preset.name}</span>
                      {selectedPreset === preset.id && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{preset.description}</p>
                    <div className={`h-8 rounded-lg ${preset.preview} flex items-center justify-center text-xs font-medium transition-all hover:scale-105`}>
                      Preview
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {preset.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isTransforming && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-primary">
                      Transforming Component...
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {transformationStep}
                    </div>
                  </div>
                </div>
                <div className="mt-2 w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-500 animate-pulse" style={{width: '70%'}} />
                </div>
              </div>
            )}

            <Button 
              onClick={handleTransform}
              disabled={isTransforming || !inputCode.trim()}
              className="w-full"
              size="lg"
            >
              {isTransforming ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Transforming...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Transform Component
                </>
              )}
            </Button>
          </Card>

          {/* Output Section */}
          <Card className="p-6 space-y-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Styled Result</h3>
              </div>
              <Badge variant="secondary" className="text-xs">
                Step 3
              </Badge>
            </div>

            {transformedCode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">
                      Component Styled with {selectedPresetData?.name}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-success hover:text-success"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </Button>
                </div>

                <Textarea
                  value={transformedCode}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-secondary/50 resize-none"
                />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCopyCode} 
                    variant="outline" 
                    className={`flex-1 group transition-all ${copySuccess ? 'bg-success/10 border-success text-success' : ''}`}
                  >
                    <Copy className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    {copySuccess ? 'Copied!' : 'Copy Code'}
                  </Button>
                  <Button onClick={handleDownload} variant="outline" className="group">
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </Button>
                </div>

                {showPreview && (
                  <div className="p-4 bg-gradient-to-br from-secondary/30 to-background rounded-lg border border-border/50">
                    <div className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Live Preview
                    </div>
                    {/* Use the improved static preview for now - can be enhanced with dynamic rendering */}
                    <StaticPreview code={transformedCode} presetId={selectedPreset} />
                  </div>
                )}
              </div>
            ) : (
              <div className="min-h-[300px] flex items-center justify-center text-muted-foreground text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary/50 flex items-center justify-center">
                    <Wand2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Ready to Transform</div>
                    <div className="text-sm max-w-xs">
                      {!inputCode.trim() 
                        ? "Paste your component code to get started"
                        : "Your beautifully styled component will appear here"
                      }
                    </div>
                  </div>
                  {!inputCode.trim() && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <AlertCircle className="w-3 h-3" />
                      <span>Tip: Try one of the examples above</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Features Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI-Powered Styling</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-primary" />
            <span>Real-time Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-primary" />
            <span>Production Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4 text-primary" />
            <span>One-Click Copy</span>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Pro Tips</h3>
            <p className="text-muted-foreground">Get the most out of your component styling</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Clean Structure</h4>
              <p className="text-sm text-muted-foreground">
                Use semantic HTML elements for better styling results and accessibility
              </p>
            </Card>
            
            <Card className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Mix Styles</h4>
              <p className="text-sm text-muted-foreground">
                Experiment with different presets to find the perfect look for your brand
              </p>
            </Card>
            
            <Card className="p-6 text-center space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Customize More</h4>
              <p className="text-sm text-muted-foreground">
                Use the generated classes as a starting point for further customization
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}









// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { Copy, Download, RefreshCw, Code, Palette, Eye, Sparkles, Play, Wand2, CheckCircle, AlertCircle, Zap } from 'lucide-react';

// // Enhanced Example Components
// const EXAMPLE_COMPONENTS = [
//   {
//     id: "button",
//     name: "Simple Button", 
//     description: "Basic button component",
//     code: `const Button = ({ children }) => {
//   return <button>{children}</button>;
// };`,
//     complexity: "Simple",
//     category: "Interactive"
//   },
//   {
//     id: "login-form",
//     name: "Login Form",
//     description: "Email and password form", 
//     code: `const LoginForm = () => {
//   return (
//     <div>
//       <h2>Welcome Back</h2>
//       <input type="email" placeholder="Email" />
//       <input type="password" placeholder="Password" />
//       <button type="submit">Login</button>
//     </div>
//   );
// };`,
//     complexity: "Medium",
//     category: "Forms"
//   },
//   {
//     id: "card",
//     name: "Card Component",
//     description: "Content card with title",
//     code: `const Card = ({ title, content }) => {
//   return (
//     <div>
//       <h3>{title}</h3>
//       <p>{content}</p>
//       <button>Learn More</button>
//     </div>
//   );
// };`,
//     complexity: "Simple", 
//     category: "Layout"
//   },
//   {
//     id: "navbar",
//     name: "Navigation Bar",
//     description: "Header navigation component",
//     code: `const NavBar = () => {
//   return (
//     <div>
//       <div>Logo</div>
//       <div>
//         <span>Home</span>
//         <span>About</span>
//         <span>Contact</span>
//       </div>
//     </div>
//   );
// };`,
//     complexity: "Medium",
//     category: "Navigation"
//   }
// ];

// // Enhanced Style Presets
// const STYLE_PRESETS = [
//   {
//     id: "clean",
//     name: "Clean",
//     description: "Google-inspired minimalism",
//     color: "bg-blue-500",
//     popular: true,
//     tags: ["minimal", "corporate", "accessible"],
//     styles: {
//       button: "px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm",
//       input: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200",
//       div: "p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200",
//       h2: "text-2xl font-bold text-gray-900 mb-4",
//       h3: "text-xl font-semibold text-gray-900 mb-3",
//       p: "text-gray-600 leading-relaxed",
//       span: "text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-50"
//     }
//   },
//   {
//     id: "soft",
//     name: "Soft UI", 
//     description: "Gentle curves and pastels",
//     color: "bg-purple-400",
//     tags: ["friendly", "rounded", "modern"],
//     styles: {
//       button: "px-6 py-3 bg-purple-100 text-purple-700 rounded-2xl font-medium hover:bg-purple-200 transition-all duration-300 shadow-lg border border-purple-200",
//       input: "w-full px-4 py-3 border border-purple-200 bg-purple-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white transition-all duration-300",
//       div: "p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100",
//       h2: "text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4",
//       h3: "text-xl font-semibold text-purple-900 mb-3",
//       p: "text-purple-700 leading-relaxed",
//       span: "text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-purple-100"
//     }
//   },
//   {
//     id: "dark",
//     name: "Dark Mode",
//     description: "Sleek dark interface", 
//     color: "bg-gray-800",
//     tags: ["modern", "sleek", "professional"],
//     styles: {
//       button: "px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200 border border-gray-600 shadow-lg",
//       input: "w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200",
//       div: "p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-700",
//       h2: "text-2xl font-bold text-white mb-4",
//       h3: "text-xl font-semibold text-gray-100 mb-3",
//       p: "text-gray-300 leading-relaxed",
//       span: "text-gray-300 hover:text-white font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-700"
//     }  
//   },
//   {
//     id: "neon",
//     name: "Neon Tech",
//     description: "Cyberpunk-inspired glow",
//     color: "bg-cyan-400", 
//     tags: ["futuristic", "cyberpunk", "bold"],
//     styles: {
//       button: "px-6 py-3 bg-black border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-lg shadow-cyan-400/25",
//       input: "w-full px-4 py-3 bg-black border-2 border-cyan-400 text-cyan-400 placeholder-cyan-600 rounded-lg focus:outline-none focus:shadow-lg focus:shadow-cyan-400/50 transition-all duration-300",
//       div: "p-6 bg-black rounded-xl shadow-2xl border-2 border-cyan-400 shadow-cyan-400/20",
//       h2: "text-2xl font-bold text-cyan-400 mb-4 drop-shadow-glow",
//       h3: "text-xl font-bold text-cyan-400 mb-3",
//       p: "text-cyan-300 leading-relaxed",
//       span: "text-cyan-400 hover:text-cyan-300 font-bold transition-colors duration-200 px-3 py-2 rounded-md hover:bg-cyan-400/20"
//     }
//   }
// ];

// // Improved Live Preview Component
// const LivePreview = ({ code, presetId }) => {
//   const presetStyles = STYLE_PRESETS.find(p => p.id === presetId)?.styles || {};
  
//   const renderPreview = () => {
//     try {
//       // Detect component type based on code content
//       const isButton = code.includes('<button') && code.includes('children');
//       const isLoginForm = code.includes('type="email"') && code.includes('type="password"');
//       const isCard = code.includes('{title}') && code.includes('{content}');
//       const isNavbar = code.includes('Logo') && code.includes('Home');

//       if (isButton) {
//         return (
//           <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
//             <button className={presetStyles.button}>
//               Click me
//             </button>
//           </div>
//         );
//       }

//       if (isLoginForm) {
//         return (
//           <div className="flex justify-center p-6 bg-gray-50 rounded-lg">
//             <div className={`space-y-4 max-w-sm w-full ${presetStyles.div}`}>
//               <h2 className={presetStyles.h2}>Welcome Back</h2>
//               <input 
//                 type="email" 
//                 placeholder="Email" 
//                 className={presetStyles.input}
//                 readOnly
//               />
//               <input 
//                 type="password" 
//                 placeholder="Password" 
//                 className={presetStyles.input}
//                 readOnly
//               />
//               <button className={`w-full ${presetStyles.button}`}>
//                 Login
//               </button>
//             </div>
//           </div>
//         );
//       }

//       if (isCard) {
//         return (
//           <div className="flex justify-center p-6 bg-gray-50 rounded-lg">
//             <div className={`max-w-sm w-full ${presetStyles.div}`}>
//               <h3 className={presetStyles.h3}>Sample Title</h3>
//               <p className={presetStyles.p}>
//                 This is sample content for the card component. It demonstrates how your styled component will look.
//               </p>
//               <div className="mt-4">
//                 <button className={presetStyles.button}>
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       }

//       if (isNavbar) {
//         return (
//           <div className="p-6 bg-gray-50 rounded-lg">
//             <div className={`flex items-center justify-between ${presetStyles.div}`}>
//               <div className={presetStyles.h3}>Logo</div>
//               <div className="flex items-center space-x-1">
//                 <span className={presetStyles.span}>Home</span>
//                 <span className={presetStyles.span}>About</span>
//                 <span className={presetStyles.span}>Contact</span>
//               </div>
//             </div>
//           </div>
//         );
//       }

//       // Default preview
//       return (
//         <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
//           <div className="text-gray-500 text-sm">
//             Preview will appear here
//           </div>
//         </div>
//       );

//     } catch (error) {
//       return (
//         <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg">
//           <div className="text-red-600 text-sm">
//             Preview unavailable
//           </div>
//         </div>
//       );
//     }
//   };

//   return renderPreview();
// };

// // Improved transformation logic
// const transformComponent = (code, presetId) => {
//   const preset = STYLE_PRESETS.find(p => p.id === presetId);
//   if (!preset) return code;

//   let transformedCode = code;
//   const { styles } = preset;

//   // Transform each element type
//   Object.entries(styles).forEach(([tag, className]) => {
//     // Handle self-closing tags
//     const selfClosingRegex = new RegExp(`<${tag}([^>]*?)\\s*\\/>`, 'g');
//     transformedCode = transformedCode.replace(selfClosingRegex, (match, attrs) => {
//       if (attrs.includes('className=')) return match;
//       return `<${tag}${attrs} className="${className}" />`;
//     });

//     // Handle regular opening tags
//     const openingTagRegex = new RegExp(`<${tag}([^>]*?)>`, 'g');
//     transformedCode = transformedCode.replace(openingTagRegex, (match, attrs) => {
//       if (attrs.includes('className=')) return match;
//       return `<${tag}${attrs} className="${className}">`;
//     });
//   });

//   return transformedCode;
// };

// // Main Component
// export default function ImprovedStylerApp() {
//   const [inputCode, setInputCode] = useState(EXAMPLE_COMPONENTS[1].code);
//   const [selectedPreset, setSelectedPreset] = useState('clean');
//   const [transformedCode, setTransformedCode] = useState('');
//   const [isTransforming, setIsTransforming] = useState(false);
//   const [showPreview, setShowPreview] = useState(true);
//   const [copySuccess, setCopySuccess] = useState(false);

//   // Auto-transform when input or preset changes
//   useEffect(() => {
//     if (!inputCode.trim()) {
//       setTransformedCode('');
//       return;
//     }

//     const timer = setTimeout(() => {
//       handleTransform();
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [inputCode, selectedPreset]);

//   const handleTransform = useCallback(async () => {
//     if (!inputCode.trim()) return;

//     setIsTransforming(true);
    
//     // Simulate processing time for better UX
//     await new Promise(resolve => setTimeout(resolve, 600));
    
//     const styled = transformComponent(inputCode, selectedPreset);
//     setTransformedCode(styled);
//     setIsTransforming(false);
//   }, [inputCode, selectedPreset]);

//   const handleExampleSelect = useCallback((example) => {
//     setInputCode(example.code);
//     setShowPreview(true);
//   }, []);

//   const handleCopyCode = useCallback(async () => {
//     try {
//       await navigator.clipboard.writeText(transformedCode);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy:', err);
//     }
//   }, [transformedCode]);

//   const handleDownload = useCallback(() => {
//     const blob = new Blob([transformedCode], { type: 'text/javascript' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'styled-component.jsx';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   }, [transformedCode]);

//   const selectedPresetData = STYLE_PRESETS.find(p => p.id === selectedPreset);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <Sparkles className="w-5 h-5 text-white" />
//               </div>
//               <h1 className="text-xl font-bold text-gray-900">React Component Styler</h1>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="text-sm text-gray-600 flex items-center space-x-1">
//                 <Zap className="w-4 h-4 text-yellow-500" />
//                 <span>Live Transform</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Quick Examples */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
//             <Code className="w-5 h-5" />
//             <span>Try an Example:</span>
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             {EXAMPLE_COMPONENTS.map((example) => (
//               <button
//                 key={example.id}
//                 onClick={() => handleExampleSelect(example)}
//                 className="p-3 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
//               >
//                 <div className="font-medium text-sm text-gray-900 group-hover:text-blue-700">
//                   {example.name}
//                 </div>
//                 <div className="text-xs text-gray-500 mt-1">
//                   {example.category} • {example.complexity}
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Main Interface */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Input Section */}
//           <div className="space-y-4">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <Code className="w-4 h-4 text-gray-600" />
//                   <h3 className="font-medium text-gray-900">Input Component</h3>
//                 </div>
//                 <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">JSX</span>
//               </div>
//               <div className="p-4">
//                 <textarea
//                   value={inputCode}
//                   onChange={(e) => setInputCode(e.target.value)}
//                   className="w-full h-80 text-sm font-mono bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                   placeholder="Paste your React component here..."
//                 />
//               </div>
//             </div>

//             {/* Before Preview */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
//                 <h4 className="font-medium text-gray-900 flex items-center space-x-2">
//                   <Eye className="w-4 h-4" />
//                   <span>Before (Unstyled)</span>
//                 </h4>
//               </div>
//               <div className="p-4">
//                 <LivePreview code={inputCode} presetId="clean" />
//               </div>
//             </div>
//           </div>

//           {/* Style Selection */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center space-x-2">
//               <Palette className="w-4 h-4 text-gray-600" />
//               <h3 className="font-medium text-gray-900">Choose Style</h3>
//             </div>
//             <div className="p-4 space-y-4">
//               {STYLE_PRESETS.map((preset) => (
//                 <div
//                   key={preset.id}
//                   onClick={() => setSelectedPreset(preset.id)}
//                   className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
//                     selectedPreset === preset.id
//                       ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200'
//                       : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                   }`}
//                 >
//                   {preset.popular && (
//                     <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
//                       Popular
//                     </span>
//                   )}
                  
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium text-gray-900">{preset.name}</span>
//                       {selectedPreset === preset.id && (
//                         <CheckCircle className="w-5 h-5 text-blue-500" />
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-600">{preset.description}</p>
//                     <div className={`h-8 rounded-lg ${preset.color} flex items-center justify-center text-white text-sm font-medium transition-transform hover:scale-105`}>
//                       Preview Style
//                     </div>
//                     <div className="flex flex-wrap gap-1">
//                       {preset.tags.map((tag) => (
//                         <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {isTransforming && (
//                 <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
//                   <div className="flex items-center space-x-3">
//                     <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
//                     <div>
//                       <div className="text-sm font-medium text-blue-800">
//                         Applying {selectedPresetData?.name} Style...
//                       </div>
//                       <div className="text-xs text-blue-600">
//                         This will take just a moment
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Output Section */}
//           <div className="space-y-4">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <Sparkles className="w-4 h-4 text-gray-600" />
//                   <h3 className="font-medium text-gray-900">Styled Component</h3>
//                 </div>
//                 {transformedCode && (
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={handleCopyCode}
//                       className={`flex items-center space-x-1 px-3 py-1 text-xs rounded-lg transition-colors ${
//                         copySuccess 
//                           ? 'bg-green-100 text-green-700' 
//                           : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                       }`}
//                     >
//                       <Copy className="w-3 h-3" />
//                       <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
//                     </button>
//                     <button
//                       onClick={handleDownload}
//                       className="flex items-center space-x-1 px-3 py-1 text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
//                     >
//                       <Download className="w-3 h-3" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <div className="p-4">
//                 {transformedCode ? (
//                   <pre className="text-sm font-mono bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto max-h-80 overflow-y-auto whitespace-pre-wrap">
//                     {transformedCode}
//                   </pre>
//                 ) : (
//                   <div className="h-80 flex items-center justify-center text-gray-500 bg-gray-50 border border-gray-200 rounded-lg">
//                     <div className="text-center space-y-2">
//                       <Wand2 className="w-8 h-8 mx-auto text-gray-400" />
//                       <div className="text-sm">Your styled component will appear here</div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* After Preview */}
//             {transformedCode && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                 <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
//                   <h4 className="font-medium text-gray-900 flex items-center space-x-2">
//                     <Eye className="w-4 h-4" />
//                     <span>After ({selectedPresetData?.name})</span>
//                   </h4>
//                   <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
//                     <CheckCircle className="w-3 h-3" />
//                     <span>Styled</span>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <LivePreview code={transformedCode} presetId={selectedPreset} />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Stats Bar */}
//         {transformedCode && (
//           <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-center space-x-8 text-sm">
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-4 h-4 text-green-500" />
//                 <span className="text-gray-600">Component Transformed</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Palette className="w-4 h-4 text-blue-500" />
//                 <span className="text-gray-600">Style: {selectedPresetData?.name}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Zap className="w-4 h-4 text-yellow-500" />
//                 <span className="text-gray-600">Production Ready</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }