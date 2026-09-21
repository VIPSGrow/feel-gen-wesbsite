"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RouteLoader from "./RouteLoader";

export default function ClientRouteLoadingBoundary({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const lastPathnameRef = useRef<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Avoid setting state for the initial render.
        if (lastPathnameRef.current === null) {
            lastPathnameRef.current = pathname;
            return;
        }

        // Trigger loader only when pathname actually changes.
        if (lastPathnameRef.current !== pathname) {
            lastPathnameRef.current = pathname;
            // Defer state update to avoid React warning.
            queueMicrotask(() => setIsLoading(true));

            // Hide after navigation finishes and render settles.
            const t = window.setTimeout(() => setIsLoading(false), 250);
            return () => window.clearTimeout(t);
        }
    }, [pathname]);

    return (
        <>
            <RouteLoader isLoading={isLoading} />
            {children}
        </>
    );
}

