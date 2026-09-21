"use client";

export default function RouteLoader({
    isLoading,
}: {
    isLoading: boolean;
}) {
    return (
        <div
            className={`route-loader-overlay ${isLoading ? "route-loader-overlay--show" : "route-loader-overlay--hide"}`}
            aria-hidden={!isLoading}
            aria-live="polite"
        >
            <div className="route-loader-content" role="status" aria-live="polite">
                <div className="spinner-border text-primary route-loader-spinner" role="status" />
                <div className="visually-hidden">Loading...</div>
            </div>
        </div>
    );
}

