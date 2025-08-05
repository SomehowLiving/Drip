import { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, RefreshCw, Code, Palette, Eye, Sparkles, Play, Wand2, CheckCircle, AlertCircle } from "lucide-react";
import React from "react";

export const Tip = () => {
    return (
        <section id="app" className="py-20 bg-gradient-to-b from-secondary/5 via-background to-secondary/5">
            <div className="container mx-auto px-4">
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
};