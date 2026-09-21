"use client"
import React from "react";
import { Leaf, Users, ShieldCheck, Globe } from "lucide-react";

const FeelSafeFeatures = () => {
    const features = [
        {
            title: "eco-Friendly & Sustainable",
            desc: "A Greener Choice, At Feel Safe Pvt. Ltd., we are committed to protecting both women and the planet. Our 'Feel' brand stands for a cleaner, greener future with products that respect nature.",
            icon: <Leaf size={40} className="text-success" />,
            bg: "#f0fdf4", // Light green
        },
        {
            title: "Entrepreneurs / Micro-Entrepreneurs",
            desc: "Creating opportunities, fostering independence, and building a stronger, self-reliant future for women through Feel Safe Sakhi Yojna.",
            icon: <Users size={40} style={{ color: "#E6519B" }} />,
            bg: "#fdf2f8", // Light pink
        },
        {
            title: "99.99% Natural Sanitary Pads",
            desc: "Since our pads are free from harmful chemicals, they ensure a gentle, rash-free, and irritation-free experience every time.",
            icon: <ShieldCheck size={40} style={{ color: "#00A9E0" }} />,
            bg: "#f0f9ff", // Light blue
        },
        {
            title: "Good for You, Good for the Earth",
            desc: "When you dispose of our sanitary pads, they return to the earth — nurturing a healthier, cleaner, and more sustainable tomorrow.",
            icon: <Globe size={40} style={{ color: "#8DC63F" }} />,
            bg: "#f7fee7", // Light lime
        },
    ];

    return (
        <section className="py-5 my-5 bg-white">
            <div className="container">
                <div className="text-center mb-5" data-aos="zoom-in">
                    <h2 className="fw-bold display-6">Why Choose <span style={{ color: 'var(--primary-color)' }}>Feel Safe?</span></h2>
                    <p className="text-muted">Innovation in hygiene, commitment to nature.</p>
                </div>

                <div className="row g-4">
                    {features.map((item, index) => (
                        <div className="col-md-6 col-lg-3" key={index} data-aos="zoom-in-up">
                            <div
                                className="card h-100 border-1 border-dark shadow-sm p-4 text-center feature-card"
                                style={{ borderRadius: "20px", transition: "transform 0.3s ease" }}
                            >
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                                    style={{ width: "80px", height: "80px", backgroundColor: item.bg }}
                                >
                                    {item.icon}
                                </div>
                                <h5 className="fw-bold mb-3" style={{ color: "#1C1C1C", minHeight: "3rem" }}>
                                    {item.title}
                                </h5>
                                <p className="text-muted small mb-0 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style >{`
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
        }
        .leading-relaxed {
          line-height: 1.6;
        }
      `}</style>
        </section>
    );
};

export default FeelSafeFeatures;