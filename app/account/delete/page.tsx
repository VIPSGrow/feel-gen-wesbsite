"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useToast } from "@/lib/contexts/ToastContext";
import { useRouter } from "next/navigation";
import serverCallFuction from "@/lib/constantFunction";
import {
    AlertTriangle,
    Trash2,
    Info,
    AlertCircle,
    ShieldAlert,
    Loader2,
} from "lucide-react";

export default function DeleteAccountPage() {
    const { user, logout } = useAuth();
    const { addToast } = useToast();
    const router = useRouter();

    const [confirmationText, setConfirmationText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState<"info" | "confirm">("info");

    const isConfirmed =
        confirmationText.trim().toUpperCase() === "DELETE";

    const handleDeleteAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isConfirmed) {
            setError("Please type 'DELETE' to confirm.");
            return;
        }

        try {
            setLoading(true);
            const res = (await serverCallFuction(
                "DELETE",
                "api/ecom/profile",
            )) as any;

            if (res.success || res.status) {
                addToast("Your account has been permanently deleted.", "success");
                // Logout and redirect after a brief delay for the toast
                setTimeout(() => {
                    logout();
                    router.push("/");
                }, 1500);
            } else {
                setError(
                    res.message || "Failed to delete account. Please try again later.",
                );
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <div
                    className="p-2 rounded-3"
                    style={{ backgroundColor: "#fee2e2" }}
                >
                    <AlertTriangle className="text-error" size={28} />
                </div>
                <div>
                    <h2 className="fw-bold m-0 text-error">Delete Account</h2>
                    <p className="text-muted mb-0 small">
                        Permanently remove your account and all associated data
                    </p>
                </div>
            </div>

            {error && (
                <div
                    className="alert alert-danger border-0 shadow-sm rounded-4 mb-4 d-flex align-items-center gap-2"
                    role="alert"
                >
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {/* Step 1: Warning & Consequences */}
            {step === "info" && (
                <div className="row g-4">
                    {/* Danger Warning Card */}
                    <div className="col-12">
                        <div
                            className="card border-0 shadow-sm rounded-4 overflow-hidden"
                            style={{ borderLeft: "5px solid #dc3545" }}
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{
                                            width: "56px",
                                            height: "56px",
                                            backgroundColor: "#fee2e2",
                                        }}
                                    >
                                        <ShieldAlert size={28} className="text-error" />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-1 text-error">
                                            This action cannot be undone!
                                        </h5>
                                        <p className="text-muted mb-0 small">
                                            Deleting your account is permanent and irreversible.
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-3 p-4 mb-3 border-1">
                                    <h6 className="fw-bold mb-3 text-error">
                                        <Info size={16} className="me-2" />
                                        What will be deleted:
                                    </h6>
                                    <ul className="list-unstyled mb-0 text-error">
                                        <li className="mb-2 d-flex align-items-start gap-2">
                                            <span className="text-error mt-1">•</span>
                                            <span>
                                                Your personal profile information and login credentials
                                            </span>
                                        </li>
                                        <li className="mb-2 d-flex align-items-start gap-2">
                                            <span className="text-error mt-1">•</span>
                                            <span>
                                                All saved addresses and delivery preferences
                                            </span>
                                        </li>
                                        <li className="mb-2 d-flex align-items-start gap-2">
                                            <span className="text-error mt-1">•</span>
                                            <span>
                                                Order history and purchase records
                                            </span>
                                        </li>
                                        <li className="mb-2 d-flex align-items-start gap-2">
                                            <span className="text-error mt-1">•</span>
                                            <span>
                                                Support tickets and correspondence history
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-start gap-2">
                                            <span className="text-error mt-1">•</span>
                                            <span>
                                                Wishlist items and product preferences
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-warning bg-opacity-10 rounded-3 p-3 mb-3">
                                    <div className="d-flex align-items-start gap-2">
                                        <AlertTriangle
                                            size={18}
                                            className="text-warning flex-shrink-0 mt-0"
                                        />
                                        <p className="mb-0 small text-dark">
                                            <strong>Note:</strong> Any pending orders or active
                                            subscriptions may be affected. Please resolve all open
                                            commitments before proceeding.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep("confirm")}
                                    className="btn btn-danger btn-lg w-100 rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                                >
                                    <Trash2 size={20} />
                                    Continue with Deletion
                                </button>

                                <div className="text-center mt-3">
                                    <button
                                        onClick={() => router.push("/account")}
                                        className="btn btn-link text-decoration-none text-muted"
                                    >
                                        No, keep my account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Confirmation */}
            {step === "confirm" && (
                <form onSubmit={handleDeleteAccount}>
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden border-danger border-2">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold text-error mb-3 d-flex align-items-center gap-2">
                                        <AlertTriangle size={22} />
                                        Final Confirmation
                                    </h5>

                                    <p className="text-muted mb-4">
                                        To confirm, please type{" "}
                                        <strong className="text-error">DELETE</strong> in the field
                                        below. This is your last chance to reconsider.
                                    </p>

                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase">
                                            Type <span className="text-error">DELETE</span> to confirm
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg rounded-3 ${confirmationText &&
                                                    (isConfirmed ? "is-valid" : "is-invalid")
                                                    }`}
                                                placeholder='Type "DELETE" here...'
                                                value={confirmationText}
                                                onChange={(e) => {
                                                    setConfirmationText(e.target.value);
                                                    if (error) setError("");
                                                }}
                                                style={{
                                                    backgroundColor: "#f9fafb",
                                                    letterSpacing: "2px",
                                                    fontWeight: 600,
                                                    textTransform: "uppercase",
                                                }}
                                                autoFocus
                                            />
                                            {confirmationText && isConfirmed && (
                                                <div className="valid-feedback ps-1">
                                                    ✓ Confirmed. You can proceed.
                                                </div>
                                            )}
                                            {confirmationText && !isConfirmed && (
                                                <div className="invalid-feedback ps-1">
                                                    Type exactly "DELETE" to confirm
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* User Info */}
                                    <div className="bg-light rounded-3 p-3 mb-4">
                                        <p className="mb-1 small text-muted">
                                            <strong>Account:</strong> {user?.name || "User"}
                                        </p>
                                        <p className="mb-0 small text-muted">
                                            <strong>Email:</strong> {user?.email || "N/A"}
                                        </p>
                                    </div>

                                    <div className="d-flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={!isConfirmed || loading}
                                            className="btn btn-danger bg-error btn-lg rounded-3 flex-grow-1 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 size={20} />
                                                    Permanently Delete Account
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setStep("info");
                                                setConfirmationText("");
                                                setError("");
                                            }}
                                            className="btn btn-outline-secondary btn-lg rounded-3"
                                        >
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            <style jsx>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .rounded-4 {
          border-radius: 1.5rem !important;
        }
      `}</style>
        </div>
    );
}

