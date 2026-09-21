"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import {
    Truck,
    Clock,
    MapPin,
    PackageCheck,
    AlertCircle,
    ShieldCheck,
    Ban,
    PhoneCall,
    Mail,
    Box,
    Store,
    Info,
    CheckCircle2,
    FileText,
    History,
    MapPinned,
    Search,
    UserCheck,
    XCircle,
    Logs,
    File,
    BanIcon,
    Globe
} from "lucide-react";
import React from "react";
import LogoCompo from "./logo/LogoCompo";

const ShippingCompo = () => {
    const { getSettingByKey } = useAuth();
    const contact_setting = getSettingByKey("contact_us") || {};

    // Standardized Heading Style for all 21 points
    const sectionHeadingStyle = "fw-bold mb-3 d-flex align-items-center h4";
    const iconSize = 24;

    return (
        <div className="container my-5 py-4" >
            <div className="row justify-content-center">
                <div className="col-lg-11">
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden " style={{ backgroundColor: 'var(--light-pink-color)' }}>

                        {/* Header Section */}
                        <div className="text-center p-5 pb-4">
                            <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-sm"
                                style={{ backgroundColor: "#f0f9ff", width: "90px", height: "90px" }}>
                                <Truck size={48} color="#00A9E0" />
                            </div>
                            <h1 className="fw-bold display-5 mb-3" style={{ color: "#1C1C1C" }}>
                                Shipping & <span style={{ color: "#8DC63F" }}>Delivery</span> Policy
                            </h1>
                            <LogoCompo />
                            <div className="mt-3">
                                <p className="text-muted small mb-0 font-monospace">CIN: U13996DL2026PTC465812</p>
                                <p className="text-muted small">Website: www.feelsafeco.in</p>
                            </div>
                            <hr className="w-25 mx-auto mt-4" style={{ borderTop: "4px solid #8DC63F", opacity: 1, borderRadius: "10px" }} />
                        </div>

                        <div className="card-body px-4 px-md-5 pb-5">

                            {/* 1. Introduction */}
                            <div className="p-4 mb-4 shadow-sm rounded-4 border-0" style={{ backgroundColor: "#f8fafc" }}>
                                <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                    <Info className="me-2 text-primary" size={iconSize} /> 1. Introduction
                                </h2>
                                <p className="mb-0 text-secondary">
                                    This Shipping & Delivery Policy outlines the terms and conditions governing the shipment and delivery of products purchased from Feel Safe Private Limited for both end customers and distributors (Sakhis). We are committed to providing fast, reliable, and secure delivery services across India.
                                </p>
                            </div>

                            <div className="row g-4">
                                {/* 2. Order Processing Time */}
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border border-light-subtle bg-light shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#00A9E0" }}>
                                            <Clock className="me-2" size={iconSize} /> 2. Order Processing Time
                                        </h2>
                                        <ul className="text-muted ps-3 mb-0">
                                            <li className="mb-2">All orders are processed and dispatched within <strong>24 to 48 working hours</strong> after order confirmation.</li>
                                            <li>Orders are not processed on Sundays and public holidays.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 3. Shipping Coverage */}
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border border-light-subtle bg-light shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#8DC63F" }}>
                                            <MapPinned className="me-2" size={iconSize} /> 3. Shipping Coverage (Pan-India)
                                        </h2>
                                        <p className="small text-muted mb-3">We deliver across all regions of India, including:</p>
                                        <div className="d-flex gap-2 flex-wrap mb-3">
                                            <span className="badge bg-white text-dark border px-3 py-2">Metro cities</span>
                                            <span className="badge bg-white text-dark border px-3 py-2">Tier-1 & Tier-2 cities</span>
                                            <span className="badge bg-white text-dark border px-3 py-2">Rural & remote areas</span>
                                        </div>
                                        <p className="small text-muted italic mb-0">Our logistics network ensures that products reach every Sakhi and customer efficiently.</p>
                                    </div>
                                </div>

                                {/* 4. Delivery Timeline */}
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border border-light-subtle bg-light shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#E6519B" }}>
                                            <PackageCheck className="me-2" size={iconSize} /> 4. Delivery Timeline
                                        </h2>
                                        <div className="bg-white rounded-3 p-3 border border-light">
                                            <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                <span className="text-muted">Metro Cities</span>
                                                <span className="fw-bold">3–5 working days</span>
                                            </div>
                                            <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                <span className="text-muted">Other Regions</span>
                                                <span className="fw-bold">5–7 working days</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span className="text-muted">Remote Areas</span>
                                                <span className="fw-bold">7–10 working days</span>
                                            </div>
                                        </div>
                                        <p className="x-small text-muted mt-3 mb-0 italic">Note: Delivery timelines may vary depending on location, logistics availability, and external factors.</p>
                                    </div>
                                </div>

                                {/* 5. Shipping Charges */}
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border border-light-subtle bg-light shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                            <FileText className="me-2" size={iconSize} color="#00A9E0" /> 5. Shipping Charges
                                        </h2>
                                        <ul className="text-muted ps-3 mb-0">
                                            <li className="mb-2">Shipping charges are calculated based on order value, weight, and delivery location.</li>
                                            <li className="mb-2">Applicable charges are displayed at the time of checkout.</li>
                                            <li className="mb-2">The company may offer free shipping under promotional schemes or bulk orders.</li>
                                            <li>Shipping charges are non-refundable, unless due to company error.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 6. Order Tracking */}
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border border-light-subtle bg-light shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                            <Search className="me-2" size={iconSize} color="#8DC63F" /> 6. Order Tracking
                                        </h2>
                                        <ul className="text-muted ps-3 mb-0">
                                            <li className="mb-2">Once dispatched, customers will receive a tracking link via SMS and email.</li>
                                            <li>Users can also track orders through their website account dashboard.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 7. Delivery Partners */}
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border border-light-subtle bg-light shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#00A9E0" }}>
                                            <Box className="me-2" size={iconSize} /> 7. Delivery Partners
                                        </h2>
                                        <p className="small text-muted mb-2">We partner with reputed logistics providers such as:</p>
                                        <div className="d-flex gap-2 flex-wrap mb-3">
                                            <span className="badge bg-white text-dark border px-3 py-2">Delhivery</span>
                                            <span className="badge bg-white text-dark border px-3 py-2">Blue Dart</span>
                                            <span className="badge bg-white text-dark border px-3 py-2">Ecom Express</span>
                                        </div>
                                        <p className="x-small text-muted italic mb-0">We may also utilize our local distributor network for efficient last-mile delivery.</p>
                                    </div>
                                </div>

                                {/* 8. Delivery Address Responsibility */}
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border border-light-subtle bg-light shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                            <UserCheck className="me-2" size={iconSize} color="#E6519B" /> 8. Delivery Address Responsibility
                                        </h2>
                                        <ul className="text-muted ps-3 mb-0">
                                            <li className="mb-2">Customers must provide a complete and accurate delivery address.</li>
                                            <li>The company shall not be responsible for delays or failed deliveries due to incorrect or incomplete details.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 9. Failed Delivery Attempts */}
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border border-light-subtle bg-light shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                            <XCircle className="me-2" size={iconSize} color="#dc2626" /> 9. Failed Delivery Attempts
                                        </h2>
                                        <p className="small fw-bold text-dark mb-2">Delivery may fail due to:</p>
                                        <ul className="text-muted ps-3 mb-3">
                                            <li>Incorrect address, Customer unavailability, or Invalid contact details.</li>
                                        </ul>
                                        <p className="small fw-bold text-dark mb-2">In such cases:</p>
                                        <ul className="text-muted ps-3 mb-0">
                                            <li>Re-delivery may be attempted; additional charges may apply.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 10. Damaged or Tampered Shipments (Standalone Card) */}
                                <div className="col-12">
                                    <div className="p-4 rounded-4 border shadow-sm" style={{ backgroundColor: "#fff5f5", borderLeft: "6px solid #f87171 !important" }}>
                                        <h2 className={sectionHeadingStyle} style={{ color: "#dc2626" }}>
                                            <ShieldCheck className="me-2" size={iconSize} /> 10. Damaged or Tampered Shipments
                                        </h2>
                                        <ul className="text-muted ps-3">
                                            <li className="mb-2">If the package appears damaged, tampered, or opened, customers must <strong>refuse delivery immediately</strong>.</li>
                                            <li>Report the issue within <strong>24 hours</strong> via phone or email.</li>
                                        </ul>
                                        <div className="bg-white p-3 rounded-3 border border-danger-subtle mt-3">
                                            <p className="mb-0 text-dark fw-bold">⚠️ Important: Customers are strongly advised to record an unboxing video at the time of delivery for verification and claim purposes.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 11. Missing or Incorrect Items (Standalone Card) */}
                                <div className="col-12">
                                    <div className="p-4 rounded-4 border shadow-sm" style={{ backgroundColor: "#fffafa", borderLeft: "6px solid #fb7185 !important" }}>
                                        <h2 className={sectionHeadingStyle} style={{ color: "#e11d48" }}>
                                            <AlertCircle className="me-2" size={iconSize} /> 11. Missing or Incorrect Items
                                        </h2>
                                        <ul className="text-muted ps-3 mb-0">
                                            <li className="mb-2">Any missing or incorrect product must be reported within <strong>24 hours</strong> of delivery.</li>
                                            <li>Claims must be supported with photo/video proof.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 12, 13, 14 Terms Row */}
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border shadow-sm" style={{ backgroundColor: "#fffafa" }}>
                                        <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                            <Logs className="me-2" size={iconSize} />12. Partial Deliveries</h2>
                                        <p className="small text-muted">Orders may be shipped in multiple consignments depending on availability. Customers will be informed accordingly.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border shadow-sm" style={{ backgroundColor: "#fffafa" }}>
                                        <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                            <Truck className="me-2" size={iconSize} />13. Delays in Delivery</h2>
                                        <p className="x-small text-muted">Due to weather, transport disruptions, or high volumes. The company is not liable but will make reasonable efforts.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border border-success-subtle shadow-sm" style={{ backgroundColor: "#f0fdf4" }}>
                                        <h2 className={sectionHeadingStyle} style={{ color: "#15803d" }}>
                                            <Store className="me-2" size={iconSize} /> 14. Local Store Pickup
                                        </h2>
                                        <ul className="x-small text-muted ps-3 mb-0">
                                            <li>No shipping charges for local pickup.</li>
                                            <li>Valid ID and order confirmation required.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 15, 16, 17, 18 Misc Row */}
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border bg-light shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                            <File className="me-2" size={iconSize} />15. Distributor (Sakhi) Policy</h2>
                                        <ul className="x-small text-muted ps-3 mb-0">
                                            <li>Bulk orders may require extra processing time.</li>
                                            <li>Special logistics/costs may apply based on size.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border bg-light shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                            <BanIcon className="me-2" size={iconSize} />16. Order Cancellation</h2>
                                        <p className="small text-muted mb-0">Orders can be cancelled <strong>before dispatch only</strong>. Once dispatched, cancellation is not permitted.</p>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="h-100 p-4 rounded-4 border shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                            <ShieldCheck className="me-2" size={iconSize} />17. Risk & Ownership</h2>
                                        <p className="small text-muted mb-0">Ownership and risk transfer upon successful delivery. Customers must inspect packages at receipt.</p>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="h-100 p-4 rounded-4 border shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#1C1C1C" }}>
                                            <Globe className="me-2" size={iconSize} />18. International Shipping</h2>
                                        <p className="small text-muted mb-0">Currently, we provide shipping <strong>only within India</strong>.</p>
                                    </div>
                                </div>

                                {/* 21. Disclaimer Standalone */}
                                <div className="col-12">
                                    <div className="p-4 rounded-4 border bg-dark text-white shadow-sm">
                                        <h2 className={sectionHeadingStyle} style={{ color: "#8DC63F" }}>19. Important Disclaimer</h2>
                                        <ul className="small mb-0 opacity-75">
                                            <li>Delivery timelines are indicative and not guaranteed.</li>
                                            <li>The company shall not be liable for delays beyond its control.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Support Section */}
                            <div className="mt-5 p-md-5 p-2 rounded-4 border text-center shadow-sm bg-white">
                                <h2 className="fw-bold mb-4 h4 text-dark mt-4">Contact for Shipping Support</h2>
                                <div className="d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center">
                                    <a href={`tel:+91${contact_setting?.phone || '9013499385'}`}
                                        className="text-decoration-none d-flex align-items-center px-md-4 px-2 py-md-3 py-2 rounded-pill border shadow-sm hover-up bg-white small">
                                        <PhoneCall size={22} className="me-3 text-primary" />
                                        <span className="fw-bold text-dark">+91 {contact_setting?.phone || '9013499385'}</span>
                                    </a>
                                    <a href={`mailto:${contact_setting?.email_1 || 'support@feelsafeco.in'}`}
                                        className="text-decoration-none d-flex align-items-center px-md-4 px-2 py-md-3 py-2 rounded-pill border shadow-sm hover-up bg-white small">
                                        <Mail size={22} className="me-3 text-pink" style={{ color: "#E6519B" }} />
                                        <span className="fw-bold text-dark">{contact_setting?.email_1 || 'support@feelsafeco.in'}</span>
                                    </a>
                                </div>

                                <div className="mt-5 pt-4 border-top">
                                    <h2 className="h5 fw-bold mb-3">Policy Updates</h2>
                                    <p className="small text-muted mb-0">Feel Safe Private Limited reserves the right to modify this policy at any time without prior notice. Updated policies will be published on the website.</p>
                                </div>

                                <div className="mt-5">
                                    <h3 className="fw-bold mb-2" style={{ color: "#8DC63F" }}>✅ Feel Safe Private Limited</h3>
                                    <p className="text-muted italic mb-0">At Feel Safe Pvt. Ltd., we strive to ensure that every order reaches you safely, quickly, and efficiently.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >

            <style jsx>{`
                .x-small { font-size: 0.8rem; }
                .italic { font-style: italic; }
                .hover-up { transition: transform 0.2s ease; }
                .hover-up:hover { transform: translateY(-3px); }
                li { list-style-type: disc; margin-bottom: 4px; }
                ul { list-style-position: inside; }
            `}</style>
        </div >
    );
};

export default ShippingCompo;