import { Code, Github, Twitter, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Drip</span>
            </div>
            <p className="text-muted-foreground">
              Transform ugly React components into beautiful UIs instantly.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#features" className="block hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="block hover:text-foreground transition-colors">How it Works</a>
              <a href="#app" className="block hover:text-foreground transition-colors">Try Now</a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#" className="block hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="block hover:text-foreground transition-colors">Examples</a>
              <a href="#" className="block hover:text-foreground transition-colors">Blog</a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 StyleTransformr. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Made with <Heart className="w-4 h-4 text-red-500" /> for developers
          </div>
        </div>
      </div>
    </footer>
  );
};