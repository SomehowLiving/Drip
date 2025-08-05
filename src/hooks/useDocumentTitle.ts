
// ==========================================
// Custom Hooks (create these files)
// ==========================================

// hooks/useDocumentTitle.ts
import { useEffect } from "react";

/**
 * A custom React hook to dynamically update the document title (i.e., the text shown in the browser tab).
 * 
 * @param title - The new title to set for the document
 */
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    // Save the current document title so we can restore it later if needed
    const previousTitle = document.title;

    // Update the document title to the new value
    document.title = title;

    // Cleanup function: when the component using this hook unmounts or 'title' changes,
    // restore the previous document title
    return () => {
      document.title = previousTitle;
    };
  }, [title]); // Run the effect whenever the 'title' changes
};