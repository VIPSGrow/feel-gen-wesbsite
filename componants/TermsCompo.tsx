"use client";

import React from "react";
import { ShieldCheck, Info, Scale, Landmark, PhoneCall, Mail, MapPin } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ContactData } from "@/lib/types/Setting";
import LogoCompo from "./logo/LogoCompo";
import Link from "next/link";


const TermsAndConditions = () => {
    const { getSettingByKey } = useAuth();
    const contact_setting = getSettingByKey("contact_us") as ContactData;
    const lastUpdated = "April 02, 2026";

    const terms = [
        { title: "Registration & Eligibility", desc: "A minimum age of 21 years and Indian citizenship are mandatory for registration as a Sakhi." },
        { title: "Equal Opportunity Policy", desc: "Every Sakhi has equal work rights and opportunities within the company; no discrimination will be tolerated." },
        { title: "Product Authenticity", desc: "Only authorized sealed packets of the 'Feel' brand can be sold. Zero tolerance for quality compromise." },
        { title: "Price Control", desc: "Charging more than the Maximum Retail Price (MRP) is strictly prohibited. Violators will face immediate ID cancellation." },
        { title: "Independent Identity", desc: "A Sakhi is an independent distributor and shall not be considered a salaried employee or agent of the company." },
        { title: "30-Day Money-Back", desc: "If the business model is not understood, unopened stock can be returned within 30 days." },
        { title: "Refund Rules", desc: "Opened, used, or damaged stock does not fall under the refund or buy-back policy." },
        { title: "Commission Payment", desc: "Earned commission will be transferred directly to the digital wallet or registered bank account." },
        { title: "TDS Deduction", desc: "As per government regulations, Tax Deducted at Source (TDS) will be deducted from all commission payments." },
        { title: "Hygiene Protocol", desc: "Adherence to hygiene standards (e.g., masks/gloves) is mandatory during delivery and product demonstrations." },
        { title: "Training & Seminars", desc: "Participation in online/offline training organized by the company is mandatory for a Sakhi's growth." },
        { title: "Official Advertising", desc: "Use only company-certified marketing materials for social media promotions." },
        { title: "Misleading Claims", desc: "Making any false or miraculous health-related claims about the products is forbidden." },
        { title: "Mandatory ID Card", desc: "Wearing the official ID card during field work and meetings is a required part of professional discipline." },
        { title: "Territorial Work", desc: "Sakhis are advised to conduct awareness campaigns within their designated pin code or allocated area." },
        { title: "Stock Limits", desc: "Distributors should purchase stock only according to actual demand; unnecessary hoarding is prohibited." },
        { title: "Equipment Safety", desc: "Maintain the demo kits and promotional materials provided by the company with proper care." },
        { title: "Data Privacy", desc: "A Sakhi shall not misuse any customer's personal information." },
        { title: "Professional Behavior", desc: "Always maintain polite and respectful behavior towards the public and fellow Sakhis." },
        { title: "Team Support", desc: "It is your responsibility to provide proper guidance and training to new Sakhis in your team." },
        { title: "Action Against Fraud", desc: "Any unethical activity found will result in the ID being blocked without prior notice." },
        { title: "Intellectual Property", desc: "Unauthorized use of the company’s logo and trademark will be considered a legal offense." },
        { title: "Nomination (Nominee)", desc: "Nominating a family member for future benefits is mandatory." },
        { title: "Rank Upgrade", desc: "Progress through Ranks 1 to 11 is entirely subject to performance and adherence to rules." },
        { title: "Royalty Eligibility", desc: "Benefits provided at the 'Amar Sakhi' level are based on company turnover and specified conditions." },
        { title: "Resignation", desc: "A Sakhi can terminate her distributorship at any time by submitting a formal application." },
        { title: "Jurisdiction", desc: "Any legal disputes will be settled exclusively within the jurisdiction of the company's registered office (Delhi Jurisdiction)." },
        { title: "Policy Changes", desc: "The company reserves the right to amend business rules and policies from time to time." },
        { title: "Digital Reputation", desc: "Disciplinary action will be taken against digital posts that damage the company’s reputation." },
        { title: "ID Transfer", desc: "A Sakhi’s ID can only be transferred to her valid legal heir (Nominee)." },
        { title: "Minimum Activity", desc: "Minimum activity within a specified timeframe is mandatory to keep the ID active." },
        { title: "Commission Calculation", desc: "The final decision on payouts and bonuses will be based on the company's system data." },
        { title: "Account Security", desc: "Keep your login credentials and OTP (One-Time Password) strictly private." },
        { title: "Collective Benefits", desc: "Additional facilities provided by the company are only for active Sakhis." },
        { title: "Full Consent", desc: "Proceeding with the registration process implies that you have accepted all these 35 terms and conditions." },
    ];

    return (
        <div className="container my-5 py-md-4 py-2">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 " style={{ backgroundColor: 'var(--light-pink-color)' }}>

                        <div className="text-center mb-5">
                            <h1 className="fw-bold display-5" style={{ color: "#1C1C1C" }}>
                                Terms & <span style={{ color: "#E6519B" }}>Conditions</span>
                            </h1>
                            {/* <h5 className="text-uppercase fw-bold mt-2" style={{ color: "#8DC63F", letterSpacing: "2px" }}>
                                Feel Safe Pvt. Ltd.
                            </h5> */}
                            <LogoCompo />
                            <p className="text-muted small mb-0">CIN: U13996DL2026PTC465812</p>
                            <p className="fw-bold" style={{ color: "#00A9E0" }}>Women Empowerment & Hygiene Awareness Campaign</p>
                            <hr className="w-25 mx-auto" style={{ borderTop: "3px solid #8DC63F", opacity: 1 }} />

                        </div>

                        <div className="row g-4 mb-5">
                            {terms.map((term, index) => (
                                <div key={index} className="col-md-6 col-lg-4">
                                    <div className="h-100 p-3 rounded-3 border-start border-4 transition-hover shadow-sm bg-light"
                                        style={{
                                            borderColor: index % 3 === 0 ? "#E6519B" : index % 3 === 1 ? "#00A9E0" : "#8DC63F"
                                        }}>
                                        <span className="badge rounded-pill mb-2 bg-dark">
                                            {index + 1}
                                        </span>
                                        <h6 className="fw-bold mb-2">{term.title}</h6>
                                        <p className="text-muted small mb-0">{term.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Contact Footer */}
                        <div className="mt-5 pt-5 border-top">
                            <h5 className="fw-bold mb-5 text-center">Legal & Contact Information</h5>
                            <div className="row g-4">
                                <div className="col-md-4 col-12">
                                    <div className="d-flex align-items-center justify-content-md-center ">
                                        {/* Fixed Width/Height Container for perfect circle */}
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                backgroundColor: "#e0f2fe",
                                                width: "50px",
                                                height: "50px",
                                                flexShrink: 0 // Prevents the circle from squishing
                                            }}
                                        >
                                            <PhoneCall size={20} color="#00A9E0" />
                                        </div>
                                        <div>
                                            <p className="small fw-bold mb-0">Phone</p>
                                            <Link href={`tel:${contact_setting?.phone || "N/A"}`}>
                                                <p className="small text-muted mb-0">{contact_setting?.phone || "N/A"}</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 col-12">
                                    <div className="d-flex align-items-center justify-content-md-center">
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                backgroundColor: "#fdf2f8",
                                                width: "50px",
                                                height: "50px",
                                                flexShrink: 0
                                            }}
                                        >
                                            <Mail size={20} color="#E6519B" />
                                        </div>
                                        <div>
                                            <p className="small fw-bold mb-0">Email</p>
                                            <Link href={`mailto:${contact_setting?.email_1 || "N/A"}`}>
                                                <p className="small text-muted mb-0">{contact_setting?.email_1 || "N/A"}</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 col-12">
                                    <div className="d-flex align-items-center justify-content-md-center ">
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                backgroundColor: "#f0fdf4",
                                                width: "50px",
                                                height: "50px",
                                                flexShrink: 0
                                            }}
                                        >
                                            <MapPin size={20} color="#8DC63F" />
                                        </div>
                                        <div>
                                            <p className="small fw-bold mb-0">Registered Office</p>
                                            <p className="small text-muted mb-0">
                                                {contact_setting?.address || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 text-center p-3 rounded-3" style={{ backgroundColor: "#f8f9fa" }}>
                                <p className="small text-muted mb-0">
                                    <strong>Jurisdiction:</strong> Any legal disputes will be settled exclusively within the jurisdiction of the company's registered office (<strong>Delhi Jurisdiction</strong>).
                                </p>
                                <p className="small text-muted mt-1">Last Updated: {lastUpdated}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>{`
        .transition-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .transition-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
        </div>
    );
};

export default TermsAndConditions;