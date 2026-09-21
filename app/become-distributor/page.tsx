"use client";

import React from "react";
import Link from "next/link";

const externalSignupUrl = "https://panel.feelsafeco.in/signup";
const externalLoginUrl = "https://panel.feelsafeco.in/signin";

const faqs = [
    {
        q: "Who can apply to become a distributor?",
        a: `The Feel Safe Sakhi Yojna: Exclusively for Women
Our Sakhi Yojna is a specialized initiative dedicated solely to women’s empowerment.We believe in creating leaders at the grassroots level.

            Women - Only Initiative: This program is exclusively designed for women who wish to become financially independent and lead the hygiene revolution in their communities.

Exclusive Territory Mapping: To ensure your business growth, each Sakhi is allotted a specific work area based on their Location and PIN Code.

Territory Protection: Once an area is assigned to a Sakhi, no other distributor or partner can be onboarded for that specific location.This "Area Lock" policy ensures you have zero internal competition and maximum earning potential.`,
    },
    {
        q: "Is there any form submission on this page?",
        a: `This page is intended for informational purposes to help you understand our vision and partnership models. To move forward and officially join the Feel Safe Pvt. Ltd. network, please use our secure application portal.

<br/>Note: No application forms are hosted directly on this page for your data security. To complete your registration as a Distributor or join the Feel Safe Sakhi Yojna, click the button below.`,
    },
    {
        q: "What products can I distribute?",
        a: `Authorized Distribution & Inventory Access
Upon successful registration and official approval of your profile, you will gain full authorization to manage your business through the Feel Safe Pvt. Ltd. partner portal.

<br/>Exclusive Inventory: Gain access to a comprehensive range of eligible ‘Feel’ hygiene products directly through your dashboard.

<br/>Seamless Ordering: Once your territory is verified and approved, you can initiate orders and manage supplies effortlessly.

<br/>Business Growth: Start distributing premium, certified products in your designated market and scale your operations with the full support of our supply chain.`,
    },
    {
        q: "How long does approval take?",
        a: `Onboarding Timelines & Guidance
We believe in a thorough and strategic verification process to protect your business territory.

<br/>Variable Approval Timelines: Please note that the verification period may vary depending on your specific Location, PIN Code mapping, and the documentation requirements for your partnership type.

<br/>Step-by-Step Guidance: Immediately following your registration, our digital panel acts as your dedicated assistant. It will provide a personalized checklist and guide you through the remaining steps of the onboarding journey.

<br/>Transparent Progress: You can monitor the status of your application at any time via the portal, ensuring you are always informed as we work toward activating your authorized distribution area.`,
    },
    {
        q: "Can I promote Feel Safe products in my local market?",
        a: "Yes. Distributors are encouraged to promote Feel Safe products locally using the brand materials and support available through the panel.",
    },
];

export default function BecomeDistributorPage() {
    return (
        <main>
            {/* Hero */}
            <section
                className="py-5"
                style={{ background: "linear-gradient(90deg, #e3f8ff 0%, #ffffff 70%)" }}
            >
                <div className="container-fluid">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-7">
                            <div
                                className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3"
                                style={{
                                    background: "#ffffffaa",
                                    border: "1px solid rgba(0,0,0,0.05)",
                                }}
                            >
                                <span
                                    className="d-inline-block rounded-circle"
                                    style={{ width: 10, height: 10, background: "#00a9e0" }}
                                />
                                <span className="fw-bold" style={{ color: "#222" }}>
                                    Wholesale • Distribution • PAN India
                                </span>
                            </div>

                            <h1 className="display-5 mb-3" style={{ lineHeight: 1.2 }}>
                                Partner with Feel Safe Pvt. Ltd. – Empowering Businesses Across Bharat

                            </h1>

                            <p className="mb-4" style={{ maxWidth: 620, color: "#747474" }}>
                                Are you looking to expand your business with a brand that millions trust? Feel Safe Pvt. Ltd. invites you to become a key part of our growing network. As a distributor of ‘Feel’ premium hygiene products, you don’t just sell a product—you join a national mission of health, hygiene, and women's empowerment.
                            </p>

                            {/* <div className="d-flex gap-3 flex-wrap">
                                <a
                                    href={externalSignupUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-primary"
                                >
                                    Apply as Distributor
                                </a>
                                <Link href="/contact-us" className="btn btn-outline-primary">
                                    Contact Us
                                </Link>
                            </div> */}

                            <div className="mt-4">
                                <small className="text-muted">
                                    You will be redirected to the distributor signup panel.
                                </small>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="card border-0 shadow-sm" style={{ borderRadius: 18 }}>
                                <div
                                    className="card-body p-4"
                                    style={{
                                        background:
                                            "radial-gradient(circle at top, rgba(0,169,224,0.12), transparent 60%)",
                                    }}
                                >
                                    <h3 className="h4 mb-3">What you get</h3>

                                    <ul className="list-unstyled mb-0" style={{ color: "#747474" }}>
                                        {[
                                            "Distributor panel access for orders and updates",
                                            "Product availability and business support flow",
                                            "Brand promotion guidance for your local market",
                                        ].map((t) => (
                                            <li
                                                key={t}
                                                className="mb-3 d-flex gap-2 align-items-start"
                                            >
                                                <span
                                                    className="mt-1"
                                                    style={{
                                                        width: 22,
                                                        height: 22,
                                                        borderRadius: 999,
                                                        background: "#00a9e0",
                                                        color: "#fff",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: 12,
                                                        flex: "0 0 auto",
                                                    }}
                                                >
                                                    ✓
                                                </span>
                                                <div>{t}</div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-4 d-flex gap-3">
                                        <Link
                                            href={externalSignupUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-primary w-100"
                                        >
                                            Continue to Signup
                                        </Link>

                                        <Link
                                            href={externalLoginUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-secondary w-100"
                                        >
                                            Distributor Login
                                        </Link>
                                    </div>

                                    {/* <div className="mt-2 text-center">
                                        <small className="text-muted">No form on this page</small>
                                    </div> */}
                                </div>
                            </div>

                            {/* Breadcrumb-like */}

                        </div>
                    </div>
                </div>
            </section>

            {/* Why become a distributor */}
            <section className="py-5">
                <div className="container-fluid">
                    <div className="row align-items-end mb-4 g-3">
                        <div className="col-lg-7">
                            <h2 className="mb-2">Why partner with Feel Safe?</h2>
                            <p className="mb-0" style={{ color: "#747474" }}>
                                Build a Profitable Legacy in the Hygiene Industry
                                Establish a high-growth distribution channel with India’s most trusted hygiene brand. At Feel Safe Pvt. Ltd., we combine the spirit of "Vocal for Local" with international quality standards to help you build a business that is both successful and socially impactful.

                            </p>
                        </div>
                        {/* <div className="col-lg-5 text-lg-end">
                            <a
                                href={externalSignupUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline-primary"
                            >
                                Apply Now
                            </a>
                        </div> */}
                    </div>

                    <div className="row g-4">
                        {[
                            {
                                title: "A Trusted & Certified Brand",
                                desc: "Feel Safe is a name synonymous with premium quality. Distribute products that are BIS, GMP, and ISO Certified, giving you a massive competitive edge and your customers complete peace of mind.",
                            },
                            {
                                title: "Superior Distribution Network",
                                desc: "Gain access to a dependable and transparent supply chain. We ensure that our ‘Feel’ premium pads reach your warehouse through a streamlined process, allowing you to serve your customers with authentic, high-performance products without delays.",
                            },
                            {
                                title: "Driven by Local Growth",
                                desc: "Grow where you live. Our model is designed to help you reach new customers, build high repeat demand, and expand your business locally. We support the Atmanirbhar Bharat vision by empowering local partners to lead the market.",
                            },
                            {
                                title: "Modern & Simple Onboarding",
                                desc: "No complicated paperwork. Use our advanced Distributor Signup Panel to submit your request. Our professional workflow guides you through every step, ensuring you are ready to start your business journey quickly and efficiently.",
                            },
                        ].map((item) => (
                            <div key={item.title} className="col-md-6 col-lg-3">
                                <div
                                    className="card border-0 shadow-sm h-100"
                                    style={{ borderRadius: 16, background: "#fff" }}
                                >
                                    <div className="card-body p-4">
                                        <div
                                            className="mb-3"
                                            style={{
                                                width: 46,
                                                height: 46,
                                                borderRadius: 14,
                                                background: "#e3f8ff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#00a9e0",
                                                fontWeight: 800,
                                            }}
                                        >
                                            ✓
                                        </div>
                                        <h3 className="h5 mb-2" style={{ color: "#222" }}>
                                            {item.title}
                                        </h3>
                                        <p className="mb-0" style={{ color: "#747474", fontSize: 14 }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section
                className="py-5"
                style={{
                    background: "#fafafa",
                    borderTop: "1px solid #f2f2f2",
                    borderBottom: "1px solid #f2f2f2",
                }}
            >
                <div className="container-fluid">
                    <h2 className="mb-4">Our Seamless Onboarding Process</h2>
                    <p>Partnering with Feel Safe Pvt. Ltd. is a streamlined digital experience. We have designed a four-step framework to get your distribution business operational in the shortest time possible.</p>

                    <div className="row g-4">
                        {[
                            {
                                step: "01",
                                title: "Digital Registration",
                                desc: "Click the ‘Apply’ button to access our secure Partnership Portal. This centralized dashboard is the starting point for all official collaborations with our brand.",
                            },
                            {
                                step: "02",
                                title: "Profile Documentation",
                                desc: "Submit your essential business credentials and geographical coverage details through the panel. This information allows our team to evaluate territory availability and align our support with your local market needs.",
                            },
                            {
                                step: "03",
                                title: "Evaluation & Approval",
                                desc: "Our strategic team will review your application for compliance and market synergy. You can track your progress in real-time through the portal, receiving automated notifications regarding your verification status.",
                            },
                            {
                                step: "04",
                                title: "Commercial Activation",
                                desc: "Once authorized, you gain full access to procure ‘Feel’ inventory. You are now ready to launch operations as an official representative of Feel Safe Pvt. Ltd., bringing world-class hygiene to your region.",
                            },
                        ].map((s) => (
                            <div key={s.step} className="col-md-6 col-lg-3">
                                <div
                                    className="card border-0 shadow-sm h-100"
                                    style={{ borderRadius: 16, background: "#fff" }}
                                >
                                    <div className="card-body p-4">
                                        <div
                                            className="mb-2"
                                            style={{
                                                fontWeight: 900,
                                                letterSpacing: 0.4,
                                                color: "#00a9e0",
                                            }}
                                        >
                                            {s.step}
                                        </div>
                                        <h3 className="h5 mb-2" style={{ color: "#222" }}>
                                            {s.title}
                                        </h3>
                                        <p className="mb-0" style={{ color: "#747474", fontSize: 14 }}>
                                            {s.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
                        <Link
                            href={externalSignupUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                        >
                            Apply as Distributor
                        </Link>
                        <Link
                            href={externalLoginUrl}
                            target="_blank"
                            title="If already registered? Please login"
                            rel="noreferrer"
                            className="btn btn-secondary"
                        >
                            Distributor Login
                        </Link>
                        <Link href="/contact-us" className="btn btn-outline-primary">
                            Ask for Help
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-5">
                <div className="container-fluid">
                    <div className="row align-items-end mb-4">
                        <div className="col-lg-7">
                            <h2 className="mb-2">Frequently asked questions</h2>
                            <p className="mb-0" style={{ color: "#747474" }}>
                                Quick answers about becoming a distributor and the signup process.
                            </p>
                        </div>
                        <div className="col-lg-5 text-lg-end">
                            <a
                                href={externalSignupUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline-primary"
                            >
                                Go to Signup
                            </a>
                        </div>
                    </div>

                    <div className="accordion" id="becomeDistributorFaq">
                        {faqs.map((f, idx) => {
                            const collapseId = `faq-collapse-${idx}`;
                            const headingId = `faq-heading-${idx}`;
                            return (
                                <div
                                    key={f.q}
                                    className="accordion-item"
                                    style={{ border: "1px solid #f0f0f0" }}
                                >
                                    <h2 className="accordion-header" id={headingId}>
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${collapseId}`}
                                            aria-expanded={idx === 0}
                                            aria-controls={collapseId}
                                            style={{
                                                fontWeight: 800,
                                                background: idx === 0 ? "#e3f8ff" : "#fff",
                                            }}
                                        >
                                            {f.q}
                                        </button>
                                    </h2>
                                    <div
                                        id={collapseId}
                                        className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                                        aria-labelledby={headingId}
                                        data-bs-parent="#becomeDistributorFaq"
                                    >
                                        <div className="accordion-body" style={{ color: "#747474" }} dangerouslySetInnerHTML={{ __html: f.a }}>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section
                className="py-5"
                style={{ background: "linear-gradient(90deg, #e3f8ff 0%, #ffffff 70%)" }}
            >
                <div className="container-fluid">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-8">
                            <h2 className="mb-2">Ready to partner with Feel Safe?</h2>
                            <p className="mb-0" style={{ color: "#747474" }}>
                                Start your distributor request using the official signup panel. This page won’t
                                submit any form—only informational content.
                            </p>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <Link
                                href={externalSignupUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary btn-lg"
                            >
                                Apply via Signup Panel
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

