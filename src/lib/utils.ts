// Import 'clsx' and its type helper 'ClassValue'.
// 'clsx' helps build dynamic className strings — it supports strings, arrays, objects, etc.,
// and automatically ignores falsy values (like false, null, undefined, '').
import { clsx, type ClassValue } from "clsx";

// Import 'twMerge' from 'tailwind-merge'.
// This function intelligently merges Tailwind CSS class names.
// For example, if both 'p-2' and 'p-4' are passed, it keeps the last one ('p-4') to avoid conflict.
import { twMerge } from "tailwind-merge";

// Define a custom utility function 'cn' that accepts any number of class name values.
// Each value can be a string, object, or array (anything allowed by 'clsx').
export function cn(...inputs: ClassValue[]) {
    // First, pass all inputs to 'clsx' to generate a single string of class names.
    // Then, pass that string to 'twMerge' to resolve any Tailwind-specific class conflicts.
    return twMerge(clsx(inputs));
}
