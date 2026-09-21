"use client";

import React from "react";
import { AlertTriangle, TrendingDown, Activity, Gavel, ShieldAlert, Globe, UserCheck, Lock, CloudOff, Mail, PhoneCall, MapPin } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import LogoCompo from "./logo/LogoCompo";
import Link from "next/link";


const LegalDisclaimer = () => {
    const { getSettingByKey } = useAuth();
    const contact_setting = getSettingByKey("contact_us") || {};
    const lastUpdated = "April 02, 2026";

    const disclaimerSections = [
        {
            title: "1. Earnings Disclaimer",
            icon: <TrendingDown size={24} color="#E6519B" />,
            content: "All Sakhis and distributors associated with Feel Safe Private Limited are clearly informed that the company does not guarantee any fixed income or salary. Earnings depend entirely on personal sales performance, team business turnover, and individual effort, time, and skills. Income levels may vary from person to person."
        },
        {
            title: "2. Investment Disclaimer",
            icon: <ShieldAlert size={24} color="#00A9E0" />,
            content: "Feel Safe Private Limited does not require or encourage large investments or stock purchases. We are a product-based direct selling company, not an investment scheme or Ponzi scheme. The company does not pay for referrals or joining; commissions are paid only on actual product sales (Sanitary Pads)."
        },
        {
            title: "3. Health Information Disclaimer",
            icon: <Activity size={24} color="#8DC63F" />,
            content: "Our products (sanitary pads) are intended only for menstrual hygiene purposes. They do not claim to cure or treat any medical condition. In case of serious health concerns, users should consult a qualified medical professional."
        },
        {
            title: "4. Legal Compliance",
            icon: <Gavel size={24} color="#1C1C1C" />,
            content: "The company strictly complies with Consumer Protection (Direct Selling) Rules, 2021 – Government of India. All disputes are subject to Delhi jurisdiction only. Every Sakhi/distributor must follow the company’s Code of Conduct."
        },
        {
            title: "5. Website & Technology Disclaimer",
            icon: <Globe size={24} color="#00A9E0" />,
            content: "Information available on the website/app is for general business guidance only. The company is not responsible for temporary service interruptions due to maintenance or technical issues."
        },
        {
            title: "6. Product Usage Responsibility",
            icon: <UserCheck size={24} color="#8DC63F" />,
            content: "Customers and distributors are advised to use products as per instructions provided. The company is not liable for misuse or improper handling of products."
        },
        {
            title: "7. No Misleading Claims Policy",
            icon: <AlertTriangle size={24} color="#E6519B" />,
            content: "Any Sakhi or distributor is strictly prohibited from making false income claims or giving misleading product or business information. Violation may lead to termination of association."
        },
        {
            title: "8. Data Privacy & Security",
            icon: <Lock size={24} color="#00A9E0" />,
            content: "Feel Safe Pvt. Ltd. respects user privacy and ensures safe handling of personal data and no unauthorized sharing of customer/distributor information."
        },
        {
            title: "9. Force Majeure Clause",
            icon: <CloudOff size={24} color="#8DC63F" />,
            content: "The company shall not be held responsible for delays or failures caused by natural disasters, government restrictions, or uncontrollable external factors."
        }
    ];

    return (
        <div className="container my-5 py-4">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 " style={{ backgroundColor: 'var(--light-pink-color)' }}>

                        {/* Header Section */}
                        <div className="text-center mb-5">
                            <span className="badge px-3 py-2 mb-3 rounded-pill" style={{ backgroundColor: "#1C1C1C", color: "#fff" }}>
                                Official Legal Document
                            </span>
                            <h1 className="fw-bold display-5" style={{ color: "#1C1C1C" }}>
                                Legal <span style={{ color: "#E6519B" }}>Disclaimer</span>
                            </h1>
                            {/* <h5 className="text-uppercase fw-bold mt-2" style={{ color: "#8DC63F", letterSpacing: "2px" }}>
                                Feel Safe Ptv. Ltd.
                            </h5> */}
                            <LogoCompo />
                            <p className="text-muted small mb-0">CIN: U13996DL2026PTC465812</p>

                            <p className="small text-muted">Website: www.feelsafeco.in</p>
                            <hr className="w-25 mx-auto" style={{ borderTop: "3px solid #8DC63F", opacity: 1 }} />
                        </div>

                        {/* Disclaimer Content Grid */}
                        <div className="row g-4">
                            {disclaimerSections.map((section, index) => (
                                <div key={index} className="col-12">
                                    <div className="p-4 rounded-4 bg-light border-0 d-flex align-items-start transition-hover shadow-sm">
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center me-md-4 me-3 shadow-sm flex-shrink-0"
                                            style={{ backgroundColor: "#fff", width: "60px", height: "60px" }}
                                        >
                                            {section.icon}
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-2" style={{ color: "#1C1C1C" }}>{section.title}</h5>
                                            <p className="text-muted mb-0 lh-base">{section.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Contact Info */}
                        <div className="mt-5 pt-5 border-top">
                            <div className="row g-4 text-md-start align-items-center">
                                <div className="col-md-4">
                                    <div className="d-flex align-items-center justify-content-md-center justify-content-md-start mb-3 mb-md-0">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                            style={{ backgroundColor: "#e0f2fe", width: "50px", height: "50px" }}>
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
                                <div className="col-md-4">
                                    <div className="d-flex align-items-center justify-content-md-center justify-content-md-start mb-3 mb-md-0">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                            style={{ backgroundColor: "#fdf2f8", width: "50px", height: "50px" }}>
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
                                <div className="col-md-4">
                                    <div className="d-flex align-items-center justify-content-md-center justify-content-md-start">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                            style={{ backgroundColor: "#f0fdf4", width: "50px", height: "50px" }}>
                                            <MapPin size={20} color="#8DC63F" />
                                        </div>
                                        <div>
                                            <p className="small fw-bold mb-0">Registered Office</p>
                                            <p className="small text-muted mb-0">
                                                {contact_setting.address || "KharKhari Nahar, Near MCD School, Najafgarh, New Delhi, Delhi – 110043, INDIA"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mt-5 text-center p-3 rounded-3" style={{ backgroundColor: "#f8f9fa" }}>
                                <p className="small text-muted mb-0">
                                    © 2026 Feel Safe Private Limited. All Rights Reserved. Disputes subject to <strong>Delhi Jurisdiction</strong>.
                                </p>
                                <p className="small text-muted mt-1">Last Updated: {lastUpdated}</p>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>{`
        .transition-hover {
          transition: all 0.3s ease;
        }
        .transition-hover:hover {
          background-color: #ffffff !important;
          transform: translateY(-3px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
        }
      `}</style>
        </div>
    );
};

export default LegalDisclaimer;