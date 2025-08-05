// hooks/useScrollToSection.ts
import { useEffect } from "react";

/**
 * Custom hook that scrolls smoothly to the section of the page
 * matching the current URL hash (e.g. #contact).
 * 
 * - On initial load, it scrolls to the hash section if one exists.
 * - It also listens for future hash changes and scrolls accordingly.
 */
export const useScrollToSection = () => {
  useEffect(() => {
    // Function to handle scrolling based on the current hash
    const handleHashChange = () => {
      const hash = window.location.hash; // e.g., "#about"
      if (hash) {
        const element = document.querySelector(hash); // find the DOM element
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth', // smooth scrolling
            block: 'start',     // align to top of the element
          });
        }
      }
    };

    // 📍 Scroll on initial page load
    handleHashChange();
    
    // 📍 Scroll on future hash changes
    window.addEventListener('hashchange', handleHashChange);

    // 🧹 Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Empty dependency array = only runs once on mount
};