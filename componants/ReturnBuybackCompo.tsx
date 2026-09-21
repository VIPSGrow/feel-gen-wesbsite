"use client";
import React from 'react';
import {
    RotateCcw,
    ShoppingBag,
    Ban,
    CheckCircle,
    Mail,
    PhoneCall,
    ShieldCheck,
    AlertCircle,
    Truck,
    Gavel
} from "lucide-react";
import { useAuth } from '@/lib/contexts/AuthContext';
import LogoCompo from './logo/LogoCompo';
import Link from 'next/link';

const ReturnBuybackCompo = () => {
    const { getSettingByKey } = useAuth();
    const contact_data = getSettingByKey("contact_us");

    const buybackTerms = [
        "Distributors can return unsold products within 30 days of purchase",
        "Products must be unused and in resalable condition",
        "Original packaging and invoice must be provided",
        "Reasonable deductions apply as per company rules"
    ];

    return (
        <div className="container my-5 py-5">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 " style={{ backgroundColor: 'var(--light-pink-color)' }}>

                        {/* Header Section */}
                        <div className="text-center mb-5">
                            <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm"
                                style={{ backgroundColor: "#f0fdf4", width: "80px", height: "80px" }}>
                                <RotateCcw size={40} color="#8DC63F" />
                            </div>
                            <h1 className="fw-bold mt-3" style={{ color: "#1C1C1C" }}>
                                Return & <span style={{ color: "#8DC63F" }}>Buyback</span> Policy
                            </h1>
                            <h5 className="text-uppercase fw-bold mt-2" style={{ color: "#00A9E0", letterSpacing: "1px" }}>
                                For Distributors / Sakhis
                            </h5>

                            <LogoCompo />
                            <hr className="w-25 mx-auto" style={{ borderTop: "3px solid #E6519B", opacity: 1 }} />
                        </div>

                        {/* Compliance Banner */}
                        <div className="alert border-0 p-3 mb-5 d-flex align-items-center"
                            style={{ backgroundColor: "#e0f2fe", borderRadius: "12px" }}>
                            <ShieldCheck className="me-3 text-info" size={24} />
                            <p className="mb-0 text-dark small fw-medium">
                                This policy is designed as per <strong>Direct Selling Rules, 2021</strong> to ensure fair practices for all our Sakhis.
                            </p>
                        </div>

                        <div className="row g-4">
                            {/* 30 Days Policy */}
                            <div className="col-md-6">
                                <div className="p-4 rounded-4 h-100 bg-light border-0 shadow-sm transition-hover">
                                    <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#8DC63F" }}>
                                        <ShoppingBag className="me-2" size={20} /> 30 Days Return Policy
                                    </h5>
                                    <ul className="list-unstyled small text-muted">
                                        {buybackTerms.map((term, i) => (
                                            <li key={i} className="mb-2 d-flex align-items-start">
                                                <CheckCircle size={14} className="me-2 mt-1 text-success flex-shrink-0" />
                                                {term}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Non-Returnable Conditions */}
                            <div className="col-md-6">
                                <div className="p-4 rounded-4 h-100 bg-light border-0 shadow-sm transition-hover">
                                    <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#E6519B" }}>
                                        <Ban className="me-2" size={20} /> Non-Returnable Conditions
                                    </h5>
                                    <ul className="text-muted small ps-3">
                                        <li className="mb-2">Used, damaged, or tampered packaging</li>
                                        <li className="mb-2">Expired or near-expiry stock</li>
                                        <li className="mb-2">Purchased under special schemes/clearance</li>
                                        <li>Opened master cartons with missing inner seals</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Process Section */}
                            <div className="col-md-7">
                                <div className="p-4 rounded-4 bg-white border shadow-sm h-100">
                                    <h5 className="fw-bold mb-3">Return Process</h5>
                                    <div className="d-flex flex-column gap-3">
                                        <div className="d-flex align-items-center">
                                            <span className="badge rounded-circle bg-dark me-3 d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>1</span>
                                            <p className="mb-0 small text-muted">Submit return request via email with invoice details.</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className="badge rounded-circle bg-dark me-3 d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>2</span>
                                            <p className="mb-0 small text-muted">Await company approval and inspection verification.</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className="badge rounded-circle bg-dark me-3 d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>3</span>
                                            <p className="mb-0 small text-muted">Ship the products to the company warehouse (at distributor cost).</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className="badge rounded-circle bg-dark me-3 d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>4</span>
                                            <p className="mb-0 small text-muted">Refund/Credit processed within 7–10 working days.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Buyback & Compliance */}
                            <div className="col-md-5">
                                <div className="p-4 rounded-4 h-100" style={{ backgroundColor: "#f8fafc", border: "1px dashed #cbd5e1" }}>
                                    <h6 className="fw-bold mb-3 d-flex align-items-center">
                                        <Gavel className="me-2" size={18} /> Legal Compliance
                                    </h6>
                                    <p className="x-small text-muted mb-4">
                                        In case of business termination, the company will process the buyback of saleable stock as per the Consumer Protection (Direct Selling) Rules, 2021.
                                    </p>
                                    <div className="d-flex align-items-center text-muted x-small">
                                        <Truck className="me-2" size={16} />
                                        <span>Shipping costs reimbursed only in case of company error.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support & Grievance Footer */}
                        <div className="mt-5 pt-5 border-top">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <h6 className="fw-bold mb-3">Contact Support</h6>
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 shadow-sm"
                                            style={{ backgroundColor: "#e0f2fe", width: "40px", height: "40px" }}>
                                            <PhoneCall size={16} color="#00A9E0" />
                                        </div>
                                        <Link href={`tel:${contact_data?.phone || "N/A"}`}>
                                            <p className="small text-muted mb-0">+91 {contact_data?.phone || "9013499385"}</p>
                                        </Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 shadow-sm"
                                            style={{ backgroundColor: "#fdf2f8", width: "40px", height: "40px" }}>
                                            <Mail size={16} color="#E6519B" />
                                        </div>
                                        <Link href={`mailto:${contact_data?.email_1 || "N/A"}`}>
                                            <p className="small text-muted mb-0">{contact_data?.email_1 || "support@feelsafeco.in"}</p>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="p-3 rounded-3" style={{ backgroundColor: "#fff5f5", borderLeft: "4px solid #f87171" }}>
                                        <h6 className="fw-bold mb-1 text-error d-flex align-items-center">
                                            <AlertCircle size={16} className="me-2" /> Grievance Redressal
                                        </h6>
                                        <p className="x-small text-muted mb-2">Email: Grievance@feelsafeco.in | Mobile: +91 8796262996</p>
                                        <p className="x-small text-muted mb-0 fw-bold">Response Time: 24–48 working hours</p>
                                    </div>
                                </div>
                            </div>
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
                    font-size: 0.8rem;
                }
            `}</style>
        </div>
    );
};

export default ReturnBuybackCompo;