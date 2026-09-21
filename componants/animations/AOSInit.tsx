"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
    useEffect(() => {
        // Guard: only run in browser
        if (typeof window === "undefined") return;

        const prefersReducedMotion =
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

        // Disable AOS on very small screens to prevent lag on low-end mobile.
        const isMobile = window.matchMedia?.("(max-width: 767px)")?.matches ?? false;

        AOS.init({
            // Performance-first defaults
            once: true,
            mirror: false,
            duration: prefersReducedMotion ? 0 : isMobile ? 800 : 1000,
            offset: isMobile ? 60 : 90,
            easing: "ease-out-quart",
            // If user prefers reduced motion, effectively disable animations
            disable: prefersReducedMotion ? true : undefined,
        });

        // In case new content is mounted after route transitions
        AOS.refreshHard();
    }, []);

    return null;
}

