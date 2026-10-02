"use client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import serverCallFuction from "@/lib/constantFunction";

const GetInvoicePage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = new URLSearchParams(searchParams.toString());

    const params: Record<string, string> = {};
    query.forEach((value, key) => {
        params[key] = value;
    });

    const orderId = params["order_id"] || params["orderId"];

    const [status, setStatus] = useState<"loading" | "success" | "error" | "idle">("idle");
    const [message, setMessage] = useState("");
    const generatedRef = useRef(false);

    useEffect(() => {
        if (generatedRef.current) return;
        generatedRef.current = true;

        const generateInvoice = async () => {
            if (!orderId) {
                setStatus("error");
                setMessage("Order ID is missing.");
                return;
            }

            setStatus("loading");
            setMessage("");
            try {
                const res = await serverCallFuction(
                    "POST",
                    "api/invoice/download-invoice",
                    params
                );
                const resAny = res as { success?: boolean; url?: string; message?: string };
                if (resAny?.success && resAny.url) {
                    setStatus("success");
                    setMessage("Invoice generated successfully.");
                    window.open(resAny.url, "_blank");
                } else {
                    setStatus("error");
                    setMessage(resAny?.message || "Failed to generate invoice.");
                }
            } catch (e) {
                console.error(e);
                setStatus("error");
                setMessage("Connection issue runtime error.");
            }
        };

        generateInvoice();
    }, [orderId]);

    if (status === "loading") {
        return (
            <div className="container py-5 text-center text-muted">
                <Loader2 className="spinner-border spinner-border-sm me-2 text-primary animate-spin" role="status" />
                <span>Generating invoice...</span>
            </div>
        );
    }

    return (
        <>
            <div className="container py-5">
                <h1>Invoice</h1>
                <p>Here you can view and download your invoice.</p>
                {status === "success" && (
                    <div className="alert alert-success shadow-sm" role="alert">
                        {message}
                    </div>
                )}
                {status === "error" && (
                    <div className="alert alert-danger shadow-sm" role="alert">
                        {message}
                    </div>
                )}
                <button onClick={() => router.back()} className="btn btn-sm btn-outline-secondary">
                    Go Back
                </button>
            </div>
        </>
    );
};

export default GetInvoicePage;
