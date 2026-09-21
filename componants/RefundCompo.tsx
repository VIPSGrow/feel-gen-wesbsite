"use client";
import React from 'react';
import {
    RefreshCcw,
    TriangleAlert,
    PackageCheck,
    Ban,
    Truck,
    HelpCircle,
    PhoneCall,
    Mail
} from "lucide-react";
import { useAuth } from '@/lib/contexts/AuthContext'; // Adjusted to your context path
import LogoCompo from './logo/LogoCompo';
import Link from 'next/link';

const RefundCompo = () => {
    const { getSettingByKey } = useAuth();
    const contact_data = getSettingByKey("contact_us");

    return (
        <div className="container my-5 py-5">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 " style={{ backgroundColor: 'var(--light-pink-color)' }}>

                        {/* Header Section */}
                        <div className="text-center mb-5">
                            <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm"
                                style={{ backgroundColor: "#fdf2f8", width: "80px", height: "80px" }}>
                                <RefreshCcw size={40} color="#E6519B" />
                            </div>
                            <h1 className="fw-bold mt-3" style={{ color: "#1C1C1C" }}>
                                Refund <span style={{ color: "#E6519B" }}>Policy</span>
                            </h1>

                            <LogoCompo />
                            <hr className="w-25 mx-auto" style={{ borderTop: "3px solid #8DC63F", opacity: 1 }} />
                        </div>

                        {/* Hygiene & Safety Warning */}
                        <div className="alert border-0 p-4 mb-5 d-flex align-items-start"
                            style={{ backgroundColor: "#fff5f5", borderRadius: "15px", borderLeft: "6px solid #f87171" }}>
                            <TriangleAlert className="me-3 mt-1 flex-shrink-0" color="#f87171" size={28} />
                            <div>
                                <h6 className="fw-bold mb-1" style={{ color: "#b91c1c" }}>Safety & Hygiene Protocol</h6>
                                <p className="mb-0 text-secondary small">
                                    At Feel Safe, we prioritize customer satisfaction. However, due to the nature of our products (Sanitary Pads & Diapers),
                                    <strong> hygiene products once opened cannot be returned or refunded</strong> for safety reasons.
                                    Packaging must be untampered for any claim.
                                </p>
                            </div>
                        </div>

                        <div className="row g-4">
                            {/* 1. Eligibility Section */}
                            <div className="col-md-6">
                                <div className="p-4 rounded-4 h-100 bg-light border-0 shadow-sm transition-hover">
                                    <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#00A9E0" }}>
                                        <PackageCheck className="me-2" size={20} /> 1. Eligibility (3 Days)
                                    </h5>
                                    <ul className="text-muted small ps-3">
                                        <li className="mb-2">Refund requests must be made within <strong>3 days</strong> of delivery.</li>
                                        <li className="mb-2">Product must be <strong>unused, unopened</strong>, and in its original packaging.</li>
                                        <li>A valid <strong>invoice/bill</strong> is mandatory for processing.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* 2. Non-Refundable Section */}
                            <div className="col-md-6">
                                <div className="p-4 rounded-4 h-100 bg-light border-0 shadow-sm transition-hover">
                                    <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#E6519B" }}>
                                        <Ban className="me-2" size={20} /> 2. Non-Refundable Conditions
                                    </h5>
                                    <ul className="text-muted small ps-3">
                                        <li className="mb-2">Any product used or damaged by the customer.</li>
                                        <li className="mb-2">Tampered packaging or broken safety seals.</li>
                                        <li>Requests submitted after the 3-day window.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* 3. Damages Section */}
                            <div className="col-md-12">
                                <div className="p-4 rounded-4 bg-white border shadow-sm">
                                    <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#1C1C1C" }}>
                                        <TriangleAlert className="me-2 text-warning" size={20} /> 3. Damaged or Wrong Product
                                    </h5>
                                    <p className="text-muted small">
                                        If you receive a <strong>damaged or wrong item</strong>, report it within <strong>24 hours</strong> of delivery.
                                        Photo or video proof (unboxing video) is required for verification.
                                    </p>
                                </div>
                            </div>

                            {/* 4. Process Section */}
                            <div className="col-md-6">
                                <h5 className="fw-bold mb-3" style={{ color: "#8DC63F" }}>4. Process & Mode</h5>
                                <div className="text-muted small">
                                    <p className="mb-2"><strong>Submission:</strong> Email us at <em>support@feelsafeco.in</em></p>
                                    <p className="mb-2"><strong>Approval:</strong> Verified within 3–5 working days.</p>
                                    <p className="mb-0"><strong>Refund Mode:</strong> Processed to the original payment method or bank transfer.</p>
                                </div>
                            </div>

                            {/* 5. Charges Section */}
                            <div className="col-md-6">
                                <h5 className="fw-bold mb-3" style={{ color: "#1C1C1C" }}>5. Shipping & Cancellation</h5>
                                <div className="text-muted small">
                                    <p className="mb-2"><Truck className="me-1" size={14} /> Shipping charges are non-refundable.</p>
                                    <p className="mb-0"><Ban className="me-1" size={14} /> Orders can only be cancelled <strong>before dispatch</strong>.</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Footer */}
                        <div className="mt-5 pt-5 border-top">
                            <div className="row g-4 text-md-center text-md-start">
                                <div className="col-md-6 ">
                                    <div className="d-flex align-items-center justify-content-md-center justify-content-md-start">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 shadow-sm"
                                            style={{ backgroundColor: "#e0f2fe", width: "50px", height: "50px" }}>
                                            <PhoneCall size={20} color="#00A9E0" />
                                        </div>
                                        <div>
                                            <p className="small fw-bold mb-0">Helpline</p>
                                            <Link href={`tel:${contact_data?.phone || "N/A"}`}>
                                                <p className="small text-muted mb-0">+91 {contact_data?.phone || ""}</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="d-flex align-items-center justify-content-md-center justify-content-md-start">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 shadow-sm"
                                            style={{ backgroundColor: "#fdf2f8", width: "50px", height: "50px" }}>
                                            <Mail size={20} color="#E6519B" />
                                        </div>
                                        <div>
                                            <p className="small fw-bold mb-0">Email Support</p>
                                            <Link href={`mailto:${contact_data?.email_1 || "N/A"}`}>
                                                <p className="small text-muted mb-0">{contact_data?.email_1 || "support@feelsafeco.in"}</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-5">
                            <p className="text-muted x-small opacity-75">
                                All disputes are subject to the exclusive jurisdiction of the courts in **Delhi**, India.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .transition-hover {
                    transition: all 0.3s ease;
                }
                .transition-hover:hover {
                    transform: translateY(-5px);
                    background-color: #ffffff !important;
                }
                .x-small {
                    font-size: 0.75rem;
                }
            `}</style>
        </div>
    );
};

export default RefundCompo; 