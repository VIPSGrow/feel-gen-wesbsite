"use client"
import React from "react";
import { FileText, Award, Shield, Globe, Landmark, Fingerprint } from "lucide-react";
import { host } from "@/lib/constantFunction";
import LogoCompo from "./logo/LogoCompo";

const documents = [
    {
        id: "gst",
        title: "GST Certificate",
        description: "Goods and Services Tax Registration Certificate",
        imageUrl: `${host}/uploads/docs/gst.jpeg`,
        icon: FileText,
        color: "#8DC63F",
        bg: "#C4DF9B",
    },
    {
        id: "udyam",
        title: "UDYAM Certificate",
        description: "MSME Registration Certificate (UDYAM)",
        imageUrl: `${host}/uploads/docs/msme.jpeg`,
        icon: Shield,
        color: "#00A9E0",
        bg: "#BDE1F3",
    },
    {
        id: "iec",
        title: "MCA Certificate",
        description: "Incorporation Certificate",
        imageUrl: `${host}/uploads/docs/mca.jpeg`,
        icon: Landmark,
        color: "#E6519B",
        bg: "#fce4ec",
    },
    {
        id: "pan",
        title: "PAN Certificate",
        description: "Permanent Account Number Card of Company",
        imageUrl: `${host}/uploads/docs/pan.jpeg`,
        icon: Fingerprint,
        color: "#00A9E0",
        bg: "#BDE1F3",
    },
    {
        id: "income",
        title: "Income Tax",
        description: "Income Tax Certification",
        imageUrl: `${host}/uploads/docs/income_tax.jpeg`,
        icon: Globe,
        color: "#8DC63F",
        bg: "#C4DF9B",
    },
];

const DocumentCompo = () => {
    return (
        <div className="container-fluid p-0 bg-light">
            {/* Hero Section - Matching image_0eb99c.jpg style */}
            <section
                className="py-5 text-center shadow-sm"
                style={{ backgroundColor: "#BDE1F3" }}
            >
                <div className="container">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm bg-white"
                        style={{ width: "80px", height: "80px" }}>
                        <FileText size={40} color="#00A9E0" />
                    </div>
                    {/* <h1 className="display-5 fw-bold" style={{ color: "#1C1C1C" }}>
                        Company <span style={{ color: "#00A9E0" }}>Legal Documents</span>
                    </h1>
                    <h5 className="text-uppercase fw-bold mt-2" style={{ color: "#E6519B", letterSpacing: "1px" }}>
                        Feel Safe Pvt. Ltd.
                    </h5> */}
                    <LogoCompo />
                    <p className="text-muted small">CIN: U13996DL2026PTC465812</p>
                    <hr className="w-25 mx-auto" style={{ borderTop: "3px solid #8DC63F", opacity: 1 }} />
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-5">
                <div className="container">
                    <div className="alert border-0 p-4 mb-5 shadow-sm text-center" style={{ backgroundColor: "#ffffff", borderRadius: "15px" }}>
                        <p className="mb-0 text-secondary lead">
                            Feel Safe Private Limited is a legally registered entity compliant with Indian government regulations.
                            We maintain full transparency in our business practices and legal standing.
                        </p>
                    </div>

                    {/* Documents Grid */}
                    <div className="row g-4">
                        {documents.map((doc) => (
                            <div key={doc.id} className="col-lg-6">
                                <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden transition-hover">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <div
                                                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                                style={{
                                                    backgroundColor: doc.bg,
                                                    width: "60px",
                                                    height: "60px",
                                                }}
                                            >
                                                <doc.icon size={28} style={{ color: doc.color }} />
                                            </div>
                                            <div>
                                                <h4 className="fw-bold mb-1">{doc.title}</h4>
                                                <p className="text-muted mb-0 small">
                                                    {doc.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Certificate Preview Box */}
                                        <div
                                            className="border rounded-3 overflow-hidden position-relative group"
                                            style={{ backgroundColor: "#f8f9fa", height: "300px" }}
                                        >
                                            <img
                                                src={doc.imageUrl}
                                                alt={doc.title}
                                                className="img-fluid w-100 h-100"
                                                style={{ objectFit: "contain", objectPosition: "top", padding: "10px" }}
                                            />
                                            {/* Overlay on hover */}
                                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-10 opacity-0 hover-opacity-100 transition-all">
                                                <a
                                                    href={doc.imageUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary rounded-pill px-4 shadow"
                                                    style={{ backgroundColor: "#00A9E0", border: "none" }}
                                                >
                                                    View Full Document
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Verification Footer Section */}
            <section className="py-5 bg-white border-top">
                <div className="container text-center">
                    <h2 className="fw-bold mb-4">
                        Legal <span style={{ color: "#8DC63F" }}>Transparency</span>
                    </h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="p-4 rounded-4 bg-light h-100">
                                <Shield className="mb-3" size={30} color="#00A9E0" />
                                <h6 className="fw-bold">Verified Entity</h6>
                                <p className="small text-muted mb-0">Registered under the Ministry of Corporate Affairs (MCA).</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 rounded-4 bg-light h-100">
                                <Landmark className="mb-3" size={30} color="#8DC63F" />
                                <h6 className="fw-bold">Tax Compliant</h6>
                                <p className="small text-muted mb-0">Regularly filed Income Tax and GST returns as per Indian laws.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 rounded-4 bg-light h-100">
                                <Award className="mb-3" size={30} color="#E6519B" />
                                <h6 className="fw-bold">MSME Recognized</h6>
                                <p className="small text-muted mb-0">Contributing to the national economy as a recognized UDYAM enterprise.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .transition-hover {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .transition-hover:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important;
                }
                .hover-opacity-100:hover {
                    opacity: 1 !important;
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    );
};

export default DocumentCompo;