"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Enable smooth scrolling for anchor links
    document.documentElement.style.scrollBehavior = "smooth";

    // Optional: Add custom easing for smoother feel
    const style = document.createElement("style");
    style.textContent = `
      * {
        scroll-behavior: smooth;
      }
      
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.documentElement.style.scrollBehavior = "";
      style.remove();
    };
  }, []);

  return null;
}
