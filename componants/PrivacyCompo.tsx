"use client"
import React from 'react'
import {
    ShieldCheck,
    Lock,
    Eye,
    CreditCard,
    Truck,
    Share2,
    UserCircle,
    Cookie,
    Bell,
    Database,
    ExternalLink,
    AlertOctagon,
    Gavel,
    Printer,
    Mail,
    PhoneCall,
    MapPin,
    Info,
} from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ContactData } from "@/lib/types/Setting";
import LogoCompo from "@/componants/logo/LogoCompo";
const PrivacyCompo = () => {

    const { getSettingByKey } = useAuth();
    const contact_setting = getSettingByKey("contact_us") as ContactData;
    const lastUpdated = "May 04, 2026";

    const policySections = [
        {
            title: "1. Introduction",
            icon: <Info size={20} />,
            content:
                "We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.",
        },
        {
            title: "2. Information We Collect",
            icon: <Database size={20} />,
            content:
                "We may collect: Full name, age, address, mobile number, email ID, KYC documents (Aadhaar, PAN), bank account details for commission payments, and login/usage data.",
        },
        {
            title: "3. Purpose of Data Collection",
            icon: <UserCircle size={20} />,
            content:
                "Used for: Account registration, processing orders, delivery, commission calculation, and sending updates/offers.",
        },
        {
            title: "4. Data Protection & Security",
            icon: <ShieldCheck size={20} />,
            content:
                "We ensure data encryption, secure servers, and protection against unauthorized access. We do not sell or share data for advertising.",
        },
        {
            title: "5. Payment Security",
            icon: <CreditCard size={20} />,
            content:
                "All banking details are kept confidential. Transactions are processed via secure gateways and commissions go directly to registered bank accounts.",
        },
        {
            title: "6. Product & Order Info",
            icon: <Truck size={20} />,
            content:
                "Customer data is used to process orders, ensure proper packaging, and share tracking details.",
        },
        {
            title: "7. Delivery Policy",
            icon: <Truck size={20} />,
            content:
                "Delivery addresses are used only for fulfillment. Third-party logistics receive only the limited required data.",
        },
        {
            title: "8. Data Sharing Policy",
            icon: <Share2 size={20} />,
            content:
                "Data shared only with: Payment gateways, logistics partners, and legal authorities if required by law.",
        },
        {
            title: "9. No Data Selling",
            icon: <Lock size={20} />,
            content:
                "We strictly do not sell, rent, or trade user data to any third party.",
        },
        {
            title: "10. User Rights",
            icon: <Gavel size={20} />,
            content:
                "You have the right to access data, update information, request account deletion, and withdraw consent.",
        },
        {
            title: "11. Cookies Policy",
            icon: <Cookie size={20} />,
            content:
                "We use cookies to improve user experience. Users can disable cookies via browser settings.",
        },
        {
            title: "12. Communication",
            icon: <Bell size={20} />,
            content:
                "We may contact users via SMS, Email, or Phone calls for updates, offers, or service-related news.",
        },
        {
            title: "13. Data Retention",
            icon: <Database size={20} />,
            content:
                "We retain your data only as long as necessary for business operations and legal compliance.",
        },
        {
            title: "14. Third-Party Links",
            icon: <ExternalLink size={20} />,
            content:
                "Our website may contain external links. We are not responsible for their privacy practices.",
        },
        {
            title: "15. Children Policy",
            icon: <ShieldCheck size={20} />,
            content:
                "Our services are intended for individuals above 18 years of age.",
        },
        {
            title: "16. Account Security",
            icon: <Lock size={20} />,
            content:
                "Users are responsible for maintaining login credentials and account confidentiality.",
        },
        {
            title: "17. Fraud Prevention",
            icon: <AlertOctagon size={20} />,
            content:
                "We monitor activities to prevent fraud and detect suspicious transactions.",
        },
        {
            title: "18. Policy Updates",
            icon: <Database size={20} />,
            content:
                "We may update this policy from time to time. Changes will be posted on the website.",
        },
        {
            title: "19. Legal Compliance",
            icon: <Gavel size={20} />,
            content:
                "We comply with the IT Act, 2000 and Consumer Protection (Direct Selling) Rules, 2021.",
        },
        {
            title: "20. Jurisdiction",
            icon: <MapPin size={20} />,
            content:
                "All disputes related to privacy will be subject to Delhi jurisdiction only.",
        },
        {
            title: "21. Consent",
            icon: <ShieldCheck size={20} />,
            content:
                "By using our website/app, you agree to this Privacy Policy.",
        },
    ];
    return (
        <div className="container my-5 py-4">
            <div className="row justify-content-center">
                <div className="col-lg-11">
                    <div
                        className="card border-0 shadow-lg p-4 p-md-5 rounded-4 "
                        style={{ backgroundColor: "var(--light-pink-color)" }}
                    >
                        <div className="text-center mb-5">
                            <h1 className="fw-bold display-5" style={{ color: "#1C1C1C" }}>
                                Privacy <span style={{ color: "#00A9E0" }}>Policy</span>
                            </h1>
                            <LogoCompo />
                            <p className="text-muted small mb-0">CIN: U13996DL2026PTC465812</p>
                            <p className="small text-muted mb-4">Last Updated: {lastUpdated}</p>
                            <hr
                                className="w-25 mx-auto"
                                style={{ borderTop: "3px solid #8DC63F", opacity: 1 }}
                            />
                        </div>

                        <div className="row g-4 mb-5">
                            {policySections.map((section, index) => (
                                <div key={index} className="col-md-6">
                                    <div
                                        className="p-4 rounded-4 h-100 transition-hover border-0 shadow-sm bg-light"
                                    >
                                        <h6
                                            className="fw-bold mb-3 d-flex align-items-center"
                                            style={{ color: "#1C1C1C" }}
                                        >
                                            <span
                                                className="me-2"
                                                style={{
                                                    color: index % 2 === 0 ? "#00A9E0" : "#E6519B",
                                                }}
                                            >
                                                {section.icon}
                                            </span>
                                            {section.title}
                                        </h6>
                                        <p className="text-muted small mb-0 lh-base">{section.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 pt-5 border-top">
                            <div className="row g-5">
                                <div className="col-md-6">
                                    <div
                                        className="p-4 rounded-4"
                                        style={{
                                            backgroundColor: "#fdf2f8",
                                            borderLeft: "5px solid #E6519B",
                                        }}
                                    >
                                        <h5 className="fw-bold mb-3" style={{ color: "#E6519B" }}>
                                            Grievance Officer
                                        </h5>
                                        <div className="mb-2">
                                            <p className="small mb-0 fw-bold">Name</p>
                                            <p className="text-muted small mb-0">Mukesh Kumar</p>
                                        </div>
                                        <div className="mb-2">
                                            <p className="small mb-0 fw-bold">Email</p>
                                            <p className="text-muted small mb-0">Grievance@feelsafeco.in</p>
                                        </div>
                                        <div>
                                            <p className="small mb-0 fw-bold">Mobile</p>
                                            <p className="text-muted small mb-0">+91 8796292696</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <h5 className="fw-bold mb-4">Contact Details</h5>
                                    <div className="d-flex align-items-center mb-3">
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                            style={{ backgroundColor: "#e0f2fe", width: "45px", height: "45px" }}
                                        >
                                            <PhoneCall size={18} color="#00A9E0" />
                                        </div>
                                        <p className="small text-muted mb-0">{contact_setting?.phone || "N/A"}</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                            style={{ backgroundColor: "#f0fdf4", width: "45px", height: "45px" }}
                                        >
                                            <MapPin size={18} color="#8DC63F" />
                                        </div>
                                        <p className="small text-muted mb-0">{contact_setting?.address || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <style>{`
              .transition-hover {
                transition: transform 0.2s ease, box-shadow 0.2s ease;
              }
              .transition-hover:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
                background-color: #ffffff !important;
              }
            `}</style>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyCompo
