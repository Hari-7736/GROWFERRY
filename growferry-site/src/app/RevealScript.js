"use client";

import { useEffect } from "react";

// Drives the scroll-reveal fade-ins and the stat count-up.
// Runs once after the page mounts; respects prefers-reduced-motion.
export default function RevealScript() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealEls = document.querySelectorAll(".reveal");

    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in-view"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }

    const statEls = document.querySelectorAll("[data-count]");
    function animateCount(el) {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      if (prefersReduced) {
        el.textContent = target + suffix;
        return;
      }
      let start = null;
      const duration = 1100;
      function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (statEls.length) {
      if ("IntersectionObserver" in window) {
        const statIo = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateCount(entry.target);
                statIo.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.4 }
        );
        statEls.forEach((el) => statIo.observe(el));
      } else {
        statEls.forEach(animateCount);
      }
    }
  }, []);

  return null;
}
