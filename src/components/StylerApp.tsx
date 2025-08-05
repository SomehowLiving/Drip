// import { useState, useEffect, useCallback } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import { Copy, Download, RefreshCw, Code, Palette, Eye, Sparkles, Play, Wand2, CheckCircle, AlertCircle } from "lucide-react";

// // Live Preview Component
// const LivePreview = ({ code, presetId }) => {
 
//   const renderPreview = () => {
//     try {
//       // Extract the JSX return statement from the component
//       const jsxMatch = code.match(/return\s*\(\s*([\s\S]*?)\s*\);/);
//       if (!jsxMatch) return null;

//       let jsxContent = jsxMatch[1].trim();
      
//       // Create preview based on the component structure
//       if (jsxContent.includes('<button')) {
//         return (
//           <div className="space-y-4">
//             <div className="text-xs text-muted-foreground mb-2">Button Component Preview:</div>
//             <div className="p-4 bg-card/50 rounded border border-border/30 flex items-center justify-center">
//               {presetId === 'clean' && (
//                 <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                   Click me
//                 </button>
//               )}
//               {presetId === 'soft' && (
//                 <button className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-all shadow-lg border border-purple-200">
//                   Click me
//                 </button>
//               )}
//               {presetId === 'dark' && (
//                 <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all border border-gray-700 shadow-lg hover:shadow-xl">
//                   Click me
//                 </button>
//               )}
//               {presetId === 'gradient' && (
//                 <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
//                   Click me
//                 </button>
//               )}
//               {presetId === 'glass' && (
//                 <div className="p-8 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl">
//                   <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 rounded-lg font-medium hover:bg-white/30 transition-all shadow-lg">
//                     Click me
//                   </button>
//                 </div>
//               )}
//               {presetId === 'neon' && (
//                 <div className="p-8 bg-black rounded-xl">
//                   <button className="px-6 py-3 bg-black border border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40">
//                     Click me
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       }

//       if (jsxContent.includes('<input') && jsxContent.includes('type="email"')) {
//         return (
//           <div className="space-y-4">
//             <div className="text-xs text-muted-foreground mb-2">Login Form Preview:</div>
//             <div className="p-4 bg-card/50 rounded border border-border/30 flex justify-center">
//               {presetId === 'clean' && (
//                 <div className="space-y-4 p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto border border-gray-100">
//                   <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" type="email" placeholder="Email" />
//                   <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" type="password" placeholder="Password" />
//                   <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
//                 </div>
//               )}
//               {presetId === 'soft' && (
//                 <div className="space-y-6 p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl max-w-md mx-auto border border-purple-100">
//                   <input className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50/50" type="email" placeholder="Email" />
//                   <input className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50/50" type="password" placeholder="Password" />
//                   <button className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-all shadow-lg border border-purple-200">Login</button>
//                 </div>
//               )}
//               {presetId === 'dark' && (
//                 <div className="space-y-4 p-6 bg-gray-900 rounded-xl shadow-xl max-w-md mx-auto border border-gray-700">
//                   <input className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400" type="email" placeholder="Email" />
//                   <input className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400" type="password" placeholder="Password" />
//                   <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all border border-gray-700 shadow-lg hover:shadow-xl">Login</button>
//                 </div>
//               )}
//               {presetId === 'gradient' && (
//                 <div className="space-y-4 p-6 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 rounded-xl shadow-xl max-w-md mx-auto border border-orange-200">
//                   <input className="w-full px-4 py-2 border-2 border-transparent bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg focus:outline-none" type="email" placeholder="Email" />
//                   <input className="w-full px-4 py-2 border-2 border-transparent bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg focus:outline-none" type="password" placeholder="Password" />
//                   <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">Login</button>
//                 </div>
//               )}
//               {presetId === 'glass' && (
//                 <div className="p-8 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl">
//                   <div className="space-y-4 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl max-w-md mx-auto border border-white/20">
//                     <input className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:outline-none focus:bg-white/30 text-gray-800 placeholder-gray-600" type="email" placeholder="Email" />
//                     <input className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:outline-none focus:bg-white/30 text-gray-800 placeholder-gray-600" type="password" placeholder="Password" />
//                     <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 rounded-lg font-medium hover:bg-white/30 transition-all shadow-lg">Login</button>
//                   </div>
//                 </div>
//               )}
//               {presetId === 'neon' && (
//                 <div className="p-8 bg-black rounded-xl">
//                   <div className="space-y-4 p-6 bg-black rounded-xl shadow-xl shadow-cyan-400/10 max-w-md mx-auto border border-cyan-400">
//                     <input className="w-full px-4 py-2 bg-black border border-cyan-400 rounded-lg focus:outline-none focus:shadow-lg focus:shadow-cyan-400/20 text-cyan-400 placeholder-cyan-600" type="email" placeholder="Email" />
//                     <input className="w-full px-4 py-2 bg-black border border-cyan-400 rounded-lg focus:outline-none focus:shadow-lg focus:shadow-cyan-400/20 text-cyan-400 placeholder-cyan-600" type="password" placeholder="Password" />
//                     <button className="px-6 py-3 bg-black border border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40">Login</button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       }

//       if (jsxContent.includes('<h3') && jsxContent.includes('{title}')) {
//         return (
//           <div className="space-y-4">
//             <div className="text-xs text-muted-foreground mb-2">Card Component Preview:</div>
//             <div className="p-4 bg-card/50 rounded border border-border/30 flex justify-center">
//               {presetId === 'clean' && (
//                 <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow max-w-sm">
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">Sample Title</h3>
//                   <p className="text-gray-600 leading-relaxed">This is sample content for the card component.</p>
//                 </div>
//               )}
//               {presetId === 'soft' && (
//                 <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100 max-w-sm">
//                   <h3 className="text-xl font-semibold text-purple-900 mb-3">Sample Title</h3>
//                   <p className="text-purple-700 leading-relaxed">This is sample content for the card component.</p>
//                 </div>
//               )}
//               {presetId === 'dark' && (
//                 <div className="p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-700 text-white max-w-sm">
//                   <h3 className="text-xl font-semibold text-white mb-2">Sample Title</h3>
//                   <p className="text-gray-300 leading-relaxed">This is sample content for the card component.</p>
//                 </div>
//               )}
//               {presetId === 'gradient' && (
//                 <div className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl transition-all max-w-sm">
//                   <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">Sample Title</h3>
//                   <p className="text-gray-700 leading-relaxed">This is sample content for the card component.</p>
//                 </div>
//               )}
//               {presetId === 'glass' && (
//                 <div className="p-8 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl">
//                   <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 hover:bg-white/20 transition-all max-w-sm">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">Sample Title</h3>
//                     <p className="text-gray-700 leading-relaxed">This is sample content for the card component.</p>
//                   </div>
//                 </div>
//               )}
//               {presetId === 'neon' && (
//                 <div className="p-8 bg-black rounded-xl">
//                   <div className="p-6 bg-black rounded-xl shadow-xl border border-cyan-400 shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all max-w-sm">
//                     <h3 className="text-xl font-semibold text-cyan-400 mb-2">Sample Title</h3>
//                     <p className="text-cyan-300 leading-relaxed">This is sample content for the card component.</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       }

//       if (jsxContent.includes('<span>Home</span>')) {
//         return (
//           <div className="space-y-4">
//             <div className="text-xs text-muted-foreground mb-2">Navigation Bar Preview:</div>
//             <div className="p-4 bg-card/50 rounded border border-border/30">
//               {presetId === 'clean' && (
//                 <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
//                   <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
//                     <span className="text-gray-600 hover:text-blue-600 font-medium transition-colors mr-6">Logo</span>
//                     <span className="text-gray-600 hover:text-blue-600 font-medium transition-colors mr-4">Home</span>
//                     <span className="text-gray-600 hover:text-blue-600 font-medium transition-colors mr-4">About</span>
//                     <span className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</span>
//                   </div>
//                 </div>
//               )}
//               {presetId === 'soft' && (
//                 <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100">
//                   <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100">
//                     <span className="text-purple-600 hover:text-purple-800 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-100 mr-4">Logo</span>
//                     <span className="text-purple-600 hover:text-purple-800 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-100 mr-2">Home</span>
//                     <span className="text-purple-600 hover:text-purple-800 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-100 mr-2">About</span>
//                     <span className="text-purple-600 hover:text-purple-800 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-100">Contact</span>
//                   </div>
//                 </div>
//               )}
//               {presetId === 'dark' && (
//                 <div className="p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-700 text-white">
//                   <div className="p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-700 text-white">
//                     <span className="text-gray-300 hover:text-white font-medium transition-colors mr-6">Logo</span>
//                     <span className="text-gray-300 hover:text-white font-medium transition-colors mr-4">Home</span>
//                     <span className="text-gray-300 hover:text-white font-medium transition-colors mr-4">About</span>
//                     <span className="text-gray-300 hover:text-white font-medium transition-colors">Contact</span>
//                   </div>
//                 </div>
//               )}
//               {presetId === 'gradient' && (
//                 <div className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl transition-all">
//                   <div className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl transition-all">
//                     <span className="text-orange-600 hover:text-pink-600 font-medium transition-colors mr-6">Logo</span>
//                     <span className="text-orange-600 hover:text-pink-600 font-medium transition-colors mr-4">Home</span>
//                     <span className="text-orange-600 hover:text-pink-600 font-medium transition-colors mr-4">About</span>
//                     <span className="text-orange-600 hover:text-pink-600 font-medium transition-colors">Contact</span>
//                   </div>
//                 </div>
//               )}
//               {presetId === 'glass' && (
//                 <div className="p-8 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl">
//                   <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 hover:bg-white/20 transition-all">
//                     <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 hover:bg-white/20 transition-all">
//                       <span className="text-gray-700 hover:text-gray-900 font-medium transition-colors mr-6">Logo</span>
//                       <span className="text-gray-700 hover:text-gray-900 font-medium transition-colors mr-4">Home</span>
//                       <span className="text-gray-700 hover:text-gray-900 font-medium transition-colors mr-4">About</span>
//                       <span className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Contact</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {presetId === 'neon' && (
//                 <div className="p-8 bg-black rounded-xl">
//                   <div className="p-6 bg-black rounded-xl shadow-xl border border-cyan-400 shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all">
//                     <div className="p-6 bg-black rounded-xl shadow-xl border border-cyan-400 shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all">
//                       <span className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:shadow-lg hover:shadow-cyan-400/20 mr-6">Logo</span>
//                       <span className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:shadow-lg hover:shadow-cyan-400/20 mr-4">Home</span>
//                       <span className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:shadow-lg hover:shadow-cyan-400/20 mr-4">About</span>
//                       <span className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:shadow-lg hover:shadow-cyan-400/20">Contact</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       }

//       // Default fallback
//       return (
//         <div className="space-y-4">
//           <div className="text-xs text-muted-foreground mb-2">Component Preview:</div>
//           <div className="p-4 bg-card/50 rounded border border-border/30 flex items-center justify-center">
//             <div className="text-sm text-muted-foreground">Preview not available for this component structure</div>
//           </div>
//         </div>
//       );
//     } catch (error) {
//       return (
//         <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
//           <div className="text-sm text-destructive">Preview Error: Unable to render preview</div>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="space-y-2">
//       {renderPreview()}
//     </div>
//   );
// };

// const EXAMPLE_COMPONENTS = [
//   {
//     name: "Simple Button",
//     description: "Basic button component",
//     code: `const Button = ({ children }) => {
//   return <button>{children}</button>;
// };`,
//     complexity: "Simple"
//   },
//   {
//     name: "Login Form",
//     description: "Email and password form",
//     code: `const LoginForm = () => {
//   return (
//     <div>
//       <input type="email" placeholder="Email" />
//       <input type="password" placeholder="Password" />
//       <button type="submit">Login</button>
//     </div>
//   );
// };`,
//     complexity: "Medium"
//   },
//   {
//     name: "Card Component",
//     description: "Content card with title",
//     code: `const Card = ({ title, content }) => {
//   return (
//     <div>
//       <h3>{title}</h3>
//       <p>{content}</p>
//     </div>
//   );
// };`,
//     complexity: "Simple"
//   },
//   {
//     name: "Navigation Bar",
//     description: "Header navigation component",
//     code: `const NavBar = () => {
//   return (
//     <div>
//       <div>Logo</div>
//       <div>
//         <div><span>Home</span></div>
//         <div><span>About</span></div>
//         <div><span>Contact</span></div>
//       </div>
//     </div>
//   );
// };`,
//     complexity: "Medium"
//   }
// ];

// const STYLE_PRESETS = [
//   {
//     id: "clean",
//     name: "Clean",
//     description: "Google-inspired minimalism",
//     preview: "bg-blue-500 hover:bg-blue-600 text-white shadow-sm",
//     color: "blue",
//     popular: true,
//     tags: ["minimal", "google", "corporate"]
//   },
//   {
//     id: "soft",
//     name: "Soft",
//     description: "Gentle curves and pastel colors",
//     preview: "bg-purple-100 hover:bg-purple-200 text-purple-700 shadow-lg border border-purple-200",
//     color: "purple",
//     tags: ["friendly", "approachable", "rounded"]
//   },
//   {
//     id: "dark",
//     name: "Dark",
//     description: "Modern dark theme",
//     preview: "bg-gray-900 hover:bg-gray-800 text-white border border-gray-700",
//     color: "gray",
//     tags: ["modern", "sleek", "professional"]
//   },
//   {
//     id: "gradient",
//     name: "Gradient",
//     description: "Vibrant gradient styles",
//     preview: "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg",
//     color: "gradient",
//     tags: ["vibrant", "modern", "eye-catching"]
//   },
//   {
//     id: "glass",
//     name: "Glass",
//     description: "Glassmorphism effect",
//     preview: "bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 shadow-xl",
//     color: "glass",
//     tags: ["trendy", "translucent", "modern"]
//   },
//   {
//     id: "neon",
//     name: "Neon",
//     description: "Cyberpunk-inspired glow",
//     preview: "bg-black border border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-400/20",
//     color: "cyan",
//     tags: ["cyberpunk", "futuristic", "glow"]
//   }
// ];

// const TRANSFORMATION_RULES = {
//   clean: {
//     button: 'className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"',
//     input: 'className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"',
//     div: 'className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"',
//     h3: 'className="text-xl font-semibold text-gray-900 mb-2"',
//     p: 'className="text-gray-600 leading-relaxed"',
//     span: 'className="text-gray-600 hover:text-blue-600 font-medium transition-colors"'
//   },
//   soft: {
//     button: 'className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-all shadow-lg border border-purple-200"',
//     input: 'className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50/50"',
//     div: 'className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100"',
//     h3: 'className="text-xl font-semibold text-purple-900 mb-3"',
//     p: 'className="text-purple-700 leading-relaxed"',
//     span: 'className="text-purple-600 hover:text-purple-800 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-100"'
//   },
//   dark: {
//     button: 'className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all border border-gray-700 shadow-lg hover:shadow-xl"',
//     input: 'className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400"',
//     div: 'className="p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-700 text-white"',
//     h3: 'className="text-xl font-semibold text-white mb-2"',
//     p: 'className="text-gray-300 leading-relaxed"',
//     span: 'className="text-gray-300 hover:text-white font-medium transition-colors"'
//   },
//   gradient: {
//     button: 'className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"',
//     input: 'className="w-full px-4 py-2 border-2 border-transparent bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg focus:outline-none focus:border-gradient-to-r focus:from-orange-400 focus:to-pink-500"',
//     div: 'className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl transition-all"',
//     h3: 'className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2"',
//     p: 'className="text-gray-700 leading-relaxed"',
//     span: 'className="text-orange-600 hover:text-pink-600 font-medium transition-colors"'
//   },
//   glass: {
//     button: 'className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 rounded-lg font-medium hover:bg-white/30 transition-all shadow-lg"',
//     input: 'className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:outline-none focus:bg-white/30 text-gray-800 placeholder-gray-600"',
//     div: 'className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 hover:bg-white/20 transition-all"',
//     h3: 'className="text-xl font-semibold text-gray-800 mb-2"',
//     p: 'className="text-gray-700 leading-relaxed"',
//     span: 'className="text-gray-700 hover:text-gray-900 font-medium transition-colors"'
//   },
//   neon: {
//     button: 'className="px-6 py-3 bg-black border border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"',
//     input: 'className="w-full px-4 py-2 bg-black border border-cyan-400 rounded-lg focus:outline-none focus:shadow-lg focus:shadow-cyan-400/20 text-cyan-400 placeholder-cyan-600"',
//     div: 'className="p-6 bg-black rounded-xl shadow-xl border border-cyan-400 shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all"',
//     h3: 'className="text-xl font-semibold text-cyan-400 mb-2"',
//     p: 'className="text-cyan-300 leading-relaxed"',
//     span: 'className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:shadow-lg hover:shadow-cyan-400/20"'
//   }
// };

// export default function StylerApp() {
//   const [inputCode, setInputCode] = useState('');
//   const [selectedPreset, setSelectedPreset] = useState('clean');
//   const [transformedCode, setTransformedCode] = useState('');
//   const [isTransforming, setIsTransforming] = useState(false);
//   const [transformationStep, setTransformationStep] = useState('');
//   const [showPreview, setShowPreview] = useState(false);

//   // Auto-transform when input changes (debounced)
//   useEffect(() => {
//     if (!inputCode.trim() || isTransforming) return;
    
//     const timer = setTimeout(() => {
//       handleTransform();
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [inputCode, selectedPreset]);

//   const handleExampleSelect = useCallback((example) => {
//     setInputCode(example.code);
//     setShowPreview(false);
//   }, []);

//   const transformCode = useCallback((code, presetId) => {
//     const rules = TRANSFORMATION_RULES[presetId];
//     if (!rules) return code;

//     let transformed = code;
    
//     // Transform each HTML element type
//     Object.entries(rules).forEach(([tag, className]) => {
//       // Handle self-closing tags and regular tags
//       const selfClosingRegex = new RegExp(`<${tag}([^>]*?)\\s*/?>`, 'g');
//       const regularRegex = new RegExp(`<${tag}([^>]*?)>`, 'g');
      
//       transformed = transformed.replace(selfClosingRegex, (match, attrs) => {
//         // Check if className already exists
//         if (attrs.includes('className=')) {
//           return match; // Don't modify if className already exists
//         }
//         return `<${tag}${attrs} ${className}${match.endsWith('/>') ? ' />' : '>'}`;
//       });
      
//       transformed = transformed.replace(regularRegex, (match, attrs) => {
//         if (attrs.includes('className=')) {
//           return match;
//         }
//         return `<${tag}${attrs} ${className}>`;
//       });
//     });

//     return transformed;
//   }, []);

//   const handleTransform = useCallback(async () => {
//     if (!inputCode.trim()) return;

//     setIsTransforming(true);
//     setTransformationStep('Analyzing component structure...');
    
//     await new Promise(resolve => setTimeout(resolve, 400));
//     setTransformationStep('Applying styling rules...');
    
//     await new Promise(resolve => setTimeout(resolve, 500));
//     setTransformationStep('Optimizing for accessibility...');
    
//     await new Promise(resolve => setTimeout(resolve, 300));
//     setTransformationStep('Finalizing component...');
    
//     const styled = transformCode(inputCode, selectedPreset);
    
//     await new Promise(resolve => setTimeout(resolve, 400));
    
//     setTransformedCode(styled);
//     setIsTransforming(false);
//     setTransformationStep('');
//     setShowPreview(true);
//   }, [inputCode, selectedPreset, transformCode]);

//   const handleCopyCode = useCallback(async () => {
//     try {
//       await navigator.clipboard.writeText(transformedCode);
//       // Show success feedback
//     } catch (err) {
//       // Show error feedback
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
//     <section id="app" className="py-20 bg-gradient-to-b from-secondary/5 via-background to-secondary/5">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center space-y-4 mb-12">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
//             <Sparkles className="w-4 h-4" />
//             AI-Powered Component Styling
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold">
//             Transform Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Components</span>
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Paste your React component and watch it become beautiful in seconds
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {/* Input Section */}
//           <Card className="p-6 space-y-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Code className="w-5 h-5 text-primary" />
//                 <h3 className="text-lg font-semibold">Your Component</h3>
//               </div>
//               <Badge variant="secondary" className="text-xs">
//                 Step 1
//               </Badge>
//             </div>

//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-muted-foreground">
//                   Try an example:
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {EXAMPLE_COMPONENTS.map((example) => (
//                     <Button
//                       key={example.name}
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleExampleSelect(example)}
//                       className="text-xs h-auto p-2 flex flex-col items-start hover:bg-primary/5"
//                       title={example.description}
//                     >
//                       <span className="font-medium">{example.name}</span>
//                       <span className="text-muted-foreground text-xs">{example.complexity}</span>
//                     </Button>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-muted-foreground">
//                   Or paste your own:
//                 </label>
//                 <Textarea
//                   placeholder="const MyComponent = () => {
//   return (
//     <div>
//       <h1>Hello World</h1>
//       <button>Click me</button>
//     </div>
//   );
// };"
//                   value={inputCode}
//                   onChange={(e) => setInputCode(e.target.value)}
//                   className="min-h-[300px] font-mono text-sm resize-none"
//                 />
//               </div>
//             </div>
//           </Card>

//           {/* Style Selection */}
//           <Card className="p-6 space-y-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Palette className="w-5 h-5 text-primary" />
//                 <h3 className="text-lg font-semibold">Choose Style</h3>
//               </div>
//               <Badge variant="secondary" className="text-xs">
//                 Step 2
//               </Badge>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               {STYLE_PRESETS.map((preset) => (
//                 <div
//                   key={preset.id}
//                   onClick={() => setSelectedPreset(preset.id)}
//                   className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
//                     selectedPreset === preset.id
//                       ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
//                       : 'border-border hover:border-primary/50'
//                   }`}
//                 >
//                   {preset.popular && (
//                     <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs">
//                       Popular
//                     </Badge>
//                   )}
                  
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-medium">{preset.name}</span>
//                       {selectedPreset === preset.id && (
//                         <CheckCircle className="w-4 h-4 text-primary" />
//                       )}
//                     </div>
//                     <p className="text-xs text-muted-foreground">{preset.description}</p>
//                     <div className={`h-8 rounded-lg ${preset.preview} flex items-center justify-center text-xs font-medium transition-all hover:scale-105`}>
//                       Preview
//                     </div>
//                     <div className="flex flex-wrap gap-1">
//                       {preset.tags.map((tag) => (
//                         <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {isTransforming && (
//               <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
//                 <div className="flex items-center gap-3">
//                   <RefreshCw className="w-4 h-4 text-primary animate-spin" />
//                   <div className="flex-1">
//                     <div className="text-sm font-medium text-primary">
//                       Transforming Component...
//                     </div>
//                     <div className="text-xs text-muted-foreground">
//                       {transformationStep}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-2 w-full bg-secondary rounded-full h-2">
//                   <div className="bg-primary h-2 rounded-full transition-all duration-500 animate-pulse" style={{width: '70%'}} />
//                 </div>
//               </div>
//             )}

//             <Button 
//               onClick={handleTransform}
//               disabled={isTransforming || !inputCode.trim()}
//               className="w-full"
//               size="lg"
//             >
//               {isTransforming ? (
//                 <>
//                   <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
//                   Transforming...
//                 </>
//               ) : (
//                 <>
//                   <Wand2 className="w-4 h-4 mr-2" />
//                   Transform Component
//                 </>
//               )}
//             </Button>
//           </Card>

//           {/* Output Section */}
//           <Card className="p-6 space-y-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Eye className="w-5 h-5 text-primary" />
//                 <h3 className="text-lg font-semibold">Styled Result</h3>
//               </div>
//               <Badge variant="secondary" className="text-xs">
//                 Step 3
//               </Badge>
//             </div>

//             {transformedCode ? (
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4 text-success" />
//                     <span className="text-sm font-medium text-success">
//                       Component Styled with {selectedPresetData?.name}
//                     </span>
//                   </div>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={() => setShowPreview(!showPreview)}
//                     className="text-success hover:text-success"
//                   >
//                     <Play className="w-3 h-3 mr-1" />
//                     {showPreview ? 'Hide' : 'Show'} Preview
//                   </Button>
//                 </div>

//                 <Textarea
//                   value={transformedCode}
//                   readOnly
//                   className="min-h-[300px] font-mono text-sm bg-secondary/50 resize-none"
//                 />
                
//                 <div className="flex gap-2">
//                   <Button onClick={handleCopyCode} variant="outline" className="flex-1 group">
//                     <Copy className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
//                     Copy Code
//                   </Button>
//                   <Button onClick={handleDownload} variant="outline" className="group">
//                     <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
//                   </Button>
//                 </div>

//                 {showPreview && (
//                   <div className="p-4 bg-gradient-to-br from-secondary/30 to-background rounded-lg border border-border/50">
//                     <div className="text-sm font-medium mb-3 flex items-center gap-2">
//                       <Eye className="w-4 h-4" />
//                       Live Preview
//                     </div>
//                     <LivePreview code={transformedCode} presetId={selectedPreset} />
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="min-h-[300px] flex items-center justify-center text-muted-foreground text-center">
//                 <div className="space-y-4">
//                   <div className="w-16 h-16 mx-auto rounded-full bg-secondary/50 flex items-center justify-center">
//                     <Wand2 className="w-8 h-8" />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="font-medium">Ready to Transform</div>
//                     <div className="text-sm max-w-xs">
//                       {!inputCode.trim() 
//                         ? "Paste your component code to get started"
//                         : "Your beautifully styled component will appear here"
//                       }
//                     </div>
//                   </div>
//                   {!inputCode.trim() && (
//                     <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                       <AlertCircle className="w-3 h-3" />
//                       <span>Tip: Try one of the examples above</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Card>
//         </div>

//         {/* Features Bar */}
//         <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
//           <div className="flex items-center gap-2">
//             <Sparkles className="w-4 h-4 text-primary" />
//             <span>AI-Powered Styling</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <RefreshCw className="w-4 h-4 text-primary" />
//             <span>Real-time Preview</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Code className="w-4 h-4 text-primary" />
//             <span>Production Ready</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Copy className="w-4 h-4 text-primary" />
//             <span>One-Click Copy</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

























import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, RefreshCw, Code, Palette, Eye, Sparkles, Play, Wand2, CheckCircle, AlertCircle } from "lucide-react";

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
        <div><span>Home</span></div>
        <div><span>About</span></div>
        <div><span>Contact</span></div>
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
    h3: 'className="text-xl font-semibold text-gray-900 mb-2"',
    p: 'className="text-gray-600 leading-relaxed"',
    span: 'className="text-gray-600 hover:text-blue-600 font-medium transition-colors"'
  },
  soft: {
    button: 'className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-all shadow-lg border border-purple-200"',
    input: 'className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50/50"',
    div: 'className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100"',
    h3: 'className="text-xl font-semibold text-purple-900 mb-3"',
    p: 'className="text-purple-700 leading-relaxed"',
    span: 'className="text-purple-600 hover:text-purple-800 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-100"'
  },
  dark: {
    button: 'className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all border border-gray-700 shadow-lg hover:shadow-xl"',
    input: 'className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400"',
    div: 'className="p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-700 text-white"',
    h3: 'className="text-xl font-semibold text-white mb-2"',
    p: 'className="text-gray-300 leading-relaxed"',
    span: 'className="text-gray-300 hover:text-white font-medium transition-colors"'
  },
  gradient: {
    button: 'className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"',
    input: 'className="w-full px-4 py-2 border-2 border-transparent bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg focus:outline-none focus:border-gradient-to-r focus:from-orange-400 focus:to-pink-500"',
    div: 'className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl transition-all"',
    h3: 'className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2"',
    p: 'className="text-gray-700 leading-relaxed"',
    span: 'className="text-orange-600 hover:text-pink-600 font-medium transition-colors"'
  },
  glass: {
    button: 'className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 rounded-lg font-medium hover:bg-white/30 transition-all shadow-lg"',
    input: 'className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:outline-none focus:bg-white/30 text-gray-800 placeholder-gray-600"',
    div: 'className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 hover:bg-white/20 transition-all"',
    h3: 'className="text-xl font-semibold text-gray-800 mb-2"',
    p: 'className="text-gray-700 leading-relaxed"',
    span: 'className="text-gray-700 hover:text-gray-900 font-medium transition-colors"'
  },
  neon: {
    button: 'className="px-6 py-3 bg-black border border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"',
    input: 'className="w-full px-4 py-2 bg-black border border-cyan-400 rounded-lg focus:outline-none focus:shadow-lg focus:shadow-cyan-400/20 text-cyan-400 placeholder-cyan-600"',
    div: 'className="p-6 bg-black rounded-xl shadow-xl border border-cyan-400 shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all"',
    h3: 'className="text-xl font-semibold text-cyan-400 mb-2"',
    p: 'className="text-cyan-300 leading-relaxed"',
    span: 'className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:shadow-lg hover:shadow-cyan-400/20"'
  }
};

export default function StylerApp() {
  const [inputCode, setInputCode] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('clean');
  const [transformedCode, setTransformedCode] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationStep, setTransformationStep] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  // Auto-transform when input changes (debounced)
  useEffect(() => {
    if (!inputCode.trim() || isTransforming) return;
    
    const timer = setTimeout(() => {
      handleTransform();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputCode, selectedPreset]);

  const handleExampleSelect = useCallback((example) => {
    setInputCode(example.code);
    setShowPreview(false);
  }, []);

  const transformCode = useCallback((code, presetId) => {
    const rules = TRANSFORMATION_RULES[presetId];
    if (!rules) return code;

    let transformed = code;
    
    // Transform each HTML element type
    Object.entries(rules).forEach(([tag, className]) => {
      // Handle self-closing tags and regular tags
      const selfClosingRegex = new RegExp(`<${tag}([^>]*?)\\s*/?>`, 'g');
      const regularRegex = new RegExp(`<${tag}([^>]*?)>`, 'g');
      
      transformed = transformed.replace(selfClosingRegex, (match, attrs) => {
        // Check if className already exists
        if (attrs.includes('className=')) {
          return match; // Don't modify if className already exists
        }
        return `<${tag}${attrs} ${className}${match.endsWith('/>') ? ' />' : '>'}`;
      });
      
      transformed = transformed.replace(regularRegex, (match, attrs) => {
        if (attrs.includes('className=')) {
          return match;
        }
        return `<${tag}${attrs} ${className}>`;
      });
    });

    return transformed;
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
      // Show success feedback
    } catch (err) {
      // Show error feedback
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
                  <Button onClick={handleCopyCode} variant="outline" className="flex-1 group">
                    <Copy className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Copy Code
                  </Button>
                  <Button onClick={handleDownload} variant="outline" className="group">
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </Button>
                </div>

                {showPreview && (
                  <div className="p-4 bg-gradient-to-br from-secondary/30 to-background rounded-lg border border-border/50">
                    <div className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Live Preview
                    </div>
                    <div className="p-4 bg-card rounded border border-border/30">
                      <div className="text-xs text-muted-foreground mb-2">
                        This is how your component would look:
                      </div>
                      <div className={`inline-block px-4 py-2 rounded ${selectedPresetData?.preview}`}>
                        Sample Element
                      </div>
                    </div>
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
      </div>
    </section>
  );
}