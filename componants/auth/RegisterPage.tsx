"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import serverCallFuction from "@/lib/constantFunction";
import { APIResponse } from "@/lib/types/User";
import TermsAndConditions from "../TermsCompo";
import PrivacyCompo from "../PrivacyCompo";
import Cookies from "js-cookie"; // Ensure Cookies is imported

interface FormData {
  phone: string;
  name: string;
  distributor_code?: number | string | null; // Allowed string for state mapping consistency
  email: string;
  password?: string;        // Optional because Google accounts don't create manual passwords
  confirmPassword?: string; // Optional
}

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const refId = searchParams.get("ref");
  const returnPath = searchParams.get("return") || "/";
  const initialReferrerId = refId ? parseInt(refId, 10) : null;
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    phone: "",
    name: "",
    distributor_code: initialReferrerId,
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState(1);
  const [isGoogleUser, setIsGoogleUser] = useState(false); // Flag tracking Google sign-up mode

  // Step indicator
  const steps = ["Phone", "Basic Details", "Account Details", "Success"];
  const progress = ((step - 1) / 3) * 100;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  // --- GOOGLE SIGN IN INITIALIZATION ---
  useEffect(() => {
    // Dynamic script injection for Google script safely inside Next.js client component
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (typeof window !== "undefined" && window.google) {
        window.google.accounts.id.initialize({
          client_id: "102621798557-slottudnqi91ro3amqckq1lpt78cpioh.apps.googleusercontent.com",
          callback: handleGoogleCallback,
        });

        if (googleButtonRef.current) {
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            text: "signup_with",
            width: 300
          });
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [step]); // Re-render button condition check if returning to step 1

  const handleGoogleCallback = async (response: any) => {
    setLoading(true);
    setError("");
    const idToken = response.credential;

    try {
      // 1. Send token to backend to determine if user exists or is new
      const res = await serverCallFuction("POST", "api/ecom/auth/google-check", { token: idToken });

      if (res.status && res.isExistingUser && res.token) {
        // SCENARIO A: Already registered -> Instantly log them in
        Cookies.set("token", res.token, { expires: 1 });
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}`;
      } else if (res.status && !res.isExistingUser) {
        // SCENARIO B: New user -> Pre-populate fields from Google info payload
        setFormData((prev) => ({
          ...prev,
          name: res.googleData.name || "",
          email: res.googleData.email || "",
        }));
        setIsGoogleUser(true);
        // Direct the social user straight to missing step parameters (Phone and Distributor Code validation)
        setStep(1);
      } else {
        setError(res.message || "Google verification failed");
      }
    } catch (err) {
      console.error("Google verify error:", err);
      setError("Failed to link via Google account");
    } finally {
      setLoading(false);
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return (
          formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone)
        );
      case 2:
        return formData.name.trim().length > 0;
      case 3:
        if (isGoogleUser) return true; // Bypass traditional password checks for secure OAuth handles
        const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
        return (
          formData.email.includes("@") &&
          formData.password && strongPasswordRegex.test(formData.password) &&
          formData.password === formData.confirmPassword
        );
      default:
        return false;
    }
  };

  const fetchDistributor = async (referral: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await serverCallFuction("GET", `api/users/profile-by-referral?referral_code=${referral}`);
      if (res.status) {
        setLoading(false);
        return true;
      } else {
        setError(res.error || "Invalid Distributor Code");
        setLoading(false);
        return false;
      }
    } catch (error) {
      setError("Error verifying distributor code");
      setLoading(false);
      return false;
    }
  };

  const nextStep = async () => {
    if (!validateStep()) {
      setError("Please fill valid details for this step");
      return;
    }

    if (step === 2) {
      const code = formData.distributor_code;
      if (code !== null && code !== undefined && String(code).trim() !== "") {
        const isValid = await fetchDistributor(String(code));
        if (!isValid) return;
      }

      // If user came via Google, they already have an email and don't need a manual password setup.
      // We can skip step 3 forms entirely and trigger submission parameters.
      if (isGoogleUser) {
        handleGoogleRegistrationFinalize();
        return;
      }
    }

    setStep(step + 1);
    setError("");
  };

  const prevStep = () => {
    setStep(step - 1);
    setError("");
  };

  // Submission Flow for Traditional Email/Password User
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    if (!formData.password || !strongPasswordRegex.test(formData.password)) {
      setError("Password must have at least 6 characters, 1 number, and 1 special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const submitData = {
        phone: formData.phone,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        distributor_code: formData.distributor_code || undefined,
      };
      const res = (await serverCallFuction(
        "POST",
        "api/ecom/auth/register",
        submitData,
      )) as APIResponse;
      if (res.status) {
        setStep(4);
        setSuccess(true);
        if (res.token) {
          // Auto-login after registration
          Cookies.set("token", res.token, { expires: 1 });
          setTimeout(() => {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}${returnPath}`;
          }, 2000);
        } else {
          setTimeout(() => {
            router.push(`/login?return=${encodeURIComponent(returnPath)}`);
          }, 3000);
        }
      } else {
        setError(res?.message);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Registration Failed";
      const apiError = err as any;
      setError(apiError?.response?.data?.message || errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Finalize Flow for New Google Authentication Profile
  const handleGoogleRegistrationFinalize = async () => {
    setLoading(true);
    setError("");
    try {
      const submitData = {
        phone: formData.phone,
        name: formData.name,
        email: formData.email,
        distributor_code: formData.distributor_code || undefined,
        isGoogleAuth: true // Tell backend to create profile without manual password criteria
      };

      const res = await serverCallFuction("POST", "api/ecom/auth/register", submitData);

      if (res.status) {
        setStep(4);
        setSuccess(true);
        if (res.token) {
          // Store token and drop them into the app directly upon successful social alignment setup
          Cookies.set("token", res.token, { expires: 1 });
          setTimeout(() => {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}${returnPath}`;
          }, 2000);
        } else {
          setTimeout(() => { router.push(`/login?return=${encodeURIComponent(returnPath)}`); }, 3000);
        }
      } else {
        setError(res.message || "Registration Failed");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Google Account Linkage Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-light min-vh-100 d-flex align-items-center py-5" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card shadow-lg border-0">
                <div className="card-body p-md-5 p-3" style={{ backgroundColor: "#ffbede" }}>
                  <div className="text-center mb-5">
                    <Image src="/assets/images/logo.png" alt="Feel Safe PVt. Ltd.." width={80} height={80} className="mb-3" priority />
                    <h1 className="fw-bold mb-1" style={{ color: "#1C1C1C" }}>Join Feel Safe</h1>
                    <p className="text-muted">
                      Step {step} of 3 - {steps[step - 1]}
                    </p>
                    <div className="progress mb-4" style={{ height: "8px" }}>
                      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    {initialReferrerId && (
                      <div className="alert alert-info">Prefilled Distributor Code: {initialReferrerId}</div>
                    )}

                    {/* --- GOOGLE SIGN IN BUTTON VIEW CONTAINER --- */}
                    {step === 1 && !isGoogleUser && (
                      <div className="d-flex flex-column align-items-center justify-content-center my-3 border-bottom pb-4">
                        <div ref={googleButtonRef}></div>
                        <div className="text-muted small mt-2">- OR REGISTER MANUALLY BELOW -</div>
                      </div>
                    )}
                  </div>

                  {success && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      Registration successful! Processing entry profile...
                      <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {error}
                      <button type="button" className="btn-close" onClick={() => setError("")}></button>
                    </div>
                  )}

                  <form onSubmit={step === 3 ? handleSubmit : undefined}>
                    {step === 1 && (
                      <div className="mb-4">
                        <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control form-control-lg bg-light border-0 py-3"
                          id="phone"
                          value={formData.phone || ""}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            if (val === "" || (/^[6-9]/.test(val) && val.length <= 10)) {
                              setFormData({ ...formData, phone: val });
                            }
                          }}
                          placeholder="Enter 10-digit phone (e.g. 9876543210)"
                          maxLength={10}
                        />
                      </div>
                    )}
                    {step === 2 && (
                      <>
                        <div className="mb-4">
                          <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                          <input
                            type="text"
                            className="form-control form-control-lg bg-light border-0 py-3"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                            disabled={isGoogleUser} // Locked if synchronized from Google Account profile
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="distributor_code" className="form-label fw-semibold">Distributor Code (Optional)</label>
                          <input
                            type="text"
                            className="form-control form-control-lg bg-light border-0 py-3"
                            id="distributor_code"
                            value={formData.distributor_code || ""}
                            onChange={(e) => setFormData({ ...formData, distributor_code: e.target.value })}
                            placeholder="Enter distributor code if you have one"
                          />
                          {loading && step === 2 && (
                            <small className="text-primary">Verifying code...</small>
                          )}
                        </div>
                      </>
                    )}
                    {step === 3 && !isGoogleUser && (
                      <>
                        <div className="mb-4">
                          <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                          <input
                            type="email"
                            className="form-control form-control-lg bg-light border-0 py-3"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="password" className="form-label fw-semibold">Password</label>
                          <input
                            type="password"
                            className="form-control form-control-lg bg-light border-0 py-3"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Password"
                          />
                          <div className="form-text mt-2">
                            <small className={formData.password && formData.password.length >= 6 ? "text-success" : "text-muted"}>✓ Min 6 characters</small><br />
                            <small className={formData.password && /[0-9]/.test(formData.password) ? "text-success" : "text-muted"}>✓ At least 1 number</small><br />
                            <small className={formData.password && /[!@#$%^&*]/.test(formData.password) ? "text-success" : "text-muted"}>✓ At least 1 special character</small>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control form-control-lg bg-light border-0 py-3"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Confirm your password"
                          />
                        </div>
                      </>
                    )}

                    {((step === 3 && !isGoogleUser) || (step === 2 && isGoogleUser)) && (
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="terms"
                          required
                          checked={isTermsChecked}
                          onChange={(e) => setIsTermsChecked(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to the{" "}
                          <span className="text-primary text-decoration-underline" style={{ cursor: 'pointer' }} onClick={() => setModalContent("Terms & Conditions")}>Terms</span>
                          {" "}and{" "}
                          <span className="text-primary text-decoration-underline" style={{ cursor: 'pointer' }} onClick={() => setModalContent("Privacy Policy")}>Privacy Policy</span>
                        </label>
                      </div>
                    )}
                    <div className="d-flex gap-2 mt-4">
                      {step > 1 && (
                        <button type="button" className="btn btn-outline-secondary flex-fill py-3" onClick={prevStep}>Previous</button>
                      )}
                      <button
                        type={(step === 3 && !isGoogleUser) ? "submit" : "button"}
                        className="btn text-white fw-bold py-3 shadow flex-fill"
                        style={{ backgroundColor: "#00A9E0", border: "none", transition: "0.3s" }}
                        onClick={((step === 3 && !isGoogleUser) || (step === 2 && isGoogleUser)) ? (isGoogleUser ? nextStep : undefined) : nextStep}
                        disabled={
                          loading ||
                          (step !== 3 && !validateStep()) ||
                          (step === 3 && !isGoogleUser && !isTermsChecked) ||
                          (step === 2 && isGoogleUser && !isTermsChecked)
                        }
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Processing...
                          </>
                        ) : (step === 3 && !isGoogleUser) || (step === 2 && isGoogleUser) ? (
                          "Register Now"
                        ) : (
                          "Next"
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">Already have an account?</p>
                    <Link href="/login" className="btn btn-primary px-4 py-2 fw-semibold">Login Here</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Modal rendering remains exactly the same */}
            {modalContent && (
              <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content border-0 shadow">
                    <div className="modal-header bg-light">
                      <h5 className="modal-title fw-bold">{modalContent}</h5>
                      <button type="button" className="btn-close" onClick={() => setModalContent(null)}></button>
                    </div>
                    <div className="modal-body p-4">
                      {modalContent === "Terms & Conditions" ? <TermsAndConditions /> : <PrivacyCompo />}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn-primary btn" onClick={() => setModalContent(null)}>I Understand</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}